import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";
import TimeFrame from "@/components/ui/TimeFrame";

let levelUpBuildingWrapper;
let store;
let getters;
const localVue = createLocalVue()
localVue.component('time-frame', TimeFrame)
localVue.component('LevelUpBuilding', LevelUpBuilding)
localVue.use(Vuex)

beforeEach(() => {
    getters = {
        building: () => () => {
            return require("./mockData/test_building_data.json")
        }
    }

    const state = {
        village: {
            data: require("./mockData/village_mock_data.json")
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

});

afterAll(() =>{
    levelUpBuildingWrapper.destroy()
})

describe('LevelUpBuilding', () => {

    it('should show building is under construction when under construction', function () {
        const message = levelUpBuildingWrapper.find('#building-is-under-construction')

        expect(message.element.textContent).toBe("Building is under construction")
    });

    it('should level up the building', function () {
        const message = levelUpBuildingWrapper.find('#building-is-under-construction')

        expect(message.element.textContent).toBe("Building is under construction")
    });
});