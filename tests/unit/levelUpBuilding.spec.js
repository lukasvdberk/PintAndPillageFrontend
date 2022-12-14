import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";
import TimeFrame from "@/components/ui/TimeFrame";
import PopulationFrame from "@/components/ui/PopulationFrame";
import ResourceItem from "@/components/ui/ResourceItem";
import VuejsDialog from "vuejs-dialog";

let levelUpBuildingWrapper;
let store;
let getters;
const localVue = createLocalVue()

localVue.use(VuejsDialog);
localVue.component('time-frame', TimeFrame)
localVue.component('population-frame', PopulationFrame)
localVue.component('resource-item', ResourceItem)
localVue.component('LevelUpBuilding', LevelUpBuilding)
localVue.component('population-frame', PopulationFrame)

localVue.use(Vuex)

const BUILDING_TEST_DATA = require("./mockData/test_building_data.json")
const VILLAGE_TEST_DATA = require("./mockData/village_mock_data.json")

function setupLevelBuildingUpComponent(getters, village) {
    getters = {
        building: () => () => {
            return BUILDING_TEST_DATA
        },
        village: () => () => {
            return {
                ...VILLAGE_TEST_DATA,
                ...village
            }
        },
        ...getters
    }

    const state = {
        village: {
            data: {
                ...VILLAGE_TEST_DATA,
                ...village
            }
        }
    }

    store = new Vuex.Store({
        state,
        getters
    })

    levelUpBuildingWrapper = shallowMount(LevelUpBuilding, {
        store,
        localVue,
    });

}

afterEach(() =>{
    levelUpBuildingWrapper.destroy()
})


describe('LevelUpBuilding', () => {

    it('should show building is under construction when under construction', () => {
        setupLevelBuildingUpComponent()

        const message = levelUpBuildingWrapper.find('#building-is-under-construction')
        const timeLeftBuilding = levelUpBuildingWrapper.find('#time-left-building')

        const expectedTimeLeftBuilding = '00:12:00'
        expect(timeLeftBuilding.vm._props.requiredTime).toBe(expectedTimeLeftBuilding) // should have the correct amount of time left
        expect(message.element.textContent).toBe("Building is under construction")
    });

    it('should not have enough resources to level up building', () => {
        const building = BUILDING_TEST_DATA;
        building.isUnderConstruction = false;
        building.resourcesRequiredLevelUp.Wood = 50;

        const vueStoreGetters = {
            building: () => () => {
                return building
            },
        }

        const villageData = VILLAGE_TEST_DATA;

        villageData.villageResources.Wood = 10; // only has 10 wood
        setupLevelBuildingUpComponent(vueStoreGetters, villageData);

        const levelUpButtonElement = levelUpBuildingWrapper.find('#level-up-building')

        const actualButtonDisabledStatus = true;
        expect(levelUpButtonElement.element.disabled).toBe(actualButtonDisabledStatus) // should be disabled
    });

    it('should have enough resources to level up building requiring multiple resources', () => {
        const building = BUILDING_TEST_DATA;
        building.isUnderConstruction = false;
        building.resourcesRequiredLevelUp.Wood = 50;
        building.resourcesRequiredLevelUp.Stone = 50;
        building.resourcesRequiredLevelUp.Hop = 50;

        const vueStoreGetters = {
            building: () => () => {
                return building
            },
        }

        const villageData = VILLAGE_TEST_DATA;

        villageData.villageResources.Wood = 60;
        villageData.villageResources.Stone = 60;
        villageData.villageResources.Hop = 60;
        setupLevelBuildingUpComponent(vueStoreGetters, villageData);

        const levelUpButtonElement = levelUpBuildingWrapper.find('#level-up-building')

        const actualButtonDisabledStatus = false;
        expect(levelUpButtonElement.element.disabled).toBe(actualButtonDisabledStatus) // should be disabled
    });

    it('should not have enough resources to level up building requiring multiple resources', () => {
        const building = BUILDING_TEST_DATA;
        building.isUnderConstruction = false;
        building.resourcesRequiredLevelUp.Wood = 50;
        building.resourcesRequiredLevelUp.Stone = 50;
        building.resourcesRequiredLevelUp.Hop = 50;

        const vueStoreGetters = {
            building: () => () => {
                return building
            },
        }

        const villageData = VILLAGE_TEST_DATA;

        villageData.villageResources.Wood = 60;
        villageData.villageResources.Stone = 40; // not enough resourcves
        villageData.villageResources.Hop = 60;
        setupLevelBuildingUpComponent(vueStoreGetters, villageData);

        const levelUpButtonElement = levelUpBuildingWrapper.find('#level-up-building')

        const actualButtonDisabledStatus = true;
        expect(levelUpButtonElement.element.disabled).toBe(actualButtonDisabledStatus) // should be disabled
    });

    it('should have enough resources to level up building', () => {
        const building = BUILDING_TEST_DATA;
        building.isUnderConstruction = false;
        building.resourcesRequiredLevelUp.Wood = 50;

        const vueStoreGetters = {
            building: () => () => {
                return building
            },
        }

        const villageData = VILLAGE_TEST_DATA;

        villageData.villageResources.Wood = 60;
        villageData.villageResources.Stone = 60;
        villageData.villageResources.Hop = 60;
        setupLevelBuildingUpComponent(vueStoreGetters, villageData);

        const levelUpButtonElement = levelUpBuildingWrapper.find('#level-up-building')

        const actualButtonDisabledStatus = false;
        expect(levelUpButtonElement.element.disabled).toBe(actualButtonDisabledStatus) // should be disabled
    });

    it('should not have enough resources when leveling up building', () => {
        const building = BUILDING_TEST_DATA;
        building.isUnderConstruction = false;
        building.resourcesRequiredLevelUp.Wood = 50;
        building.populationRequiredNextLevel = 4000;

        const vueStoreGetters = {
            building: () => () => {
                return building
            },
        }

        const villageData = VILLAGE_TEST_DATA;

        villageData.villageResources.Wood = 60;
        villageData.villageResources.Stone = 60;
        villageData.villageResources.Hop = 60;
        villageData.populationLeft = 1000; // enough population to level up building
        setupLevelBuildingUpComponent(vueStoreGetters, villageData);
        const levelUpButtonElement = levelUpBuildingWrapper.find('#level-up-building')

        const actualButtonDisabledStatus = true;
        expect(levelUpButtonElement.element.disabled).toBe(actualButtonDisabledStatus) // should be disabled
    });

    it('should level up the building when you have enough resources, is not under construction and has enough population', () => {
        const building = BUILDING_TEST_DATA;
        building.isUnderConstruction = false;
        building.resourcesRequiredLevelUp.Wood = 50;
        building.populationRequiredNextLevel = 1000;

        const vueStoreGetters = {
            building: () => () => {
                return building
            },
        }

        const villageData = VILLAGE_TEST_DATA;

        villageData.villageResources.Wood = 60;
        villageData.villageResources.Stone = 60; // not enough resources
        villageData.villageResources.Hop = 60;
        villageData.populationLeft = 3000; // enough population to level up building
        setupLevelBuildingUpComponent(vueStoreGetters, villageData);
        const levelUpButtonElement = levelUpBuildingWrapper.find('#level-up-building')

        const actualButtonDisabledStatus = false;
        expect(levelUpButtonElement.element.disabled).toBe(actualButtonDisabledStatus) // should be disabled
    });

    it('should remove building when the remove building button is pressed', async () => {
        expect.assertions(3);
        const building = BUILDING_TEST_DATA;
        building.isUnderConstruction = false;
        building.resourcesRequiredLevelUp.Wood = 50;
        building.populationRequiredNextLevel = 1000;

        const vueStoreGetters = {
            building: () => () => {
                return building
            },
        }

        const villageData = VILLAGE_TEST_DATA;

        villageData.villageResources.Wood = 60;
        villageData.villageResources.Stone = 60; // not enough resources
        villageData.villageResources.Hop = 60;
        villageData.populationLeft = 3000; // enough population to level up building
        setupLevelBuildingUpComponent(vueStoreGetters, villageData);

        const expectedRemovalPopupMessage = 'Are you sure you want to delete the level ' + building.level + ' ' + building.name + '?' +
            'This action cannot be undone and no resources will be returned'


        levelUpBuildingWrapper.vm.$dialog.confirm = jest.fn().mockImplementation((actualMessage) => {
            expect(actualMessage).toBe(expectedRemovalPopupMessage);
            return Promise.resolve(true); // confirm the removal
        });

        const expectedType = 'removeBuilding';
        const expectedBuildingIdToBeRemoved = building.buildingId;
        levelUpBuildingWrapper.vm.$store.dispatch  = jest.fn().mockImplementation((actualType, actualBuildingId) => {
            // expect removal of building to be called
            expect(actualType).toBe(expectedType);
            expect(actualBuildingId).toBe(expectedBuildingIdToBeRemoved);
            return Promise.resolve(); // confirm the removal
        });


        const removeBuildingButton = levelUpBuildingWrapper.find('#remove-building-button')
        await removeBuildingButton.trigger('click');
        await levelUpBuildingWrapper.vm.$nextTick();
    });
});