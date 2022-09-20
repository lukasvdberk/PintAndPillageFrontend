import {createLocalVue, mount} from "@vue/test-utils";
import Vuex from "vuex";
import Village from "@/views/Village";
import SettingsModal from "@/components/ui/modals/SettingsModal";
import TutorialModal from "@/components/ui/modals/TutorialModal";
import CombatLogsModal from "@/components/ui/modals/CombatLogsModal";
import VillageGrid from "@/components/VillageGrid";

let villageWrapper;
let store;
let getters;
const localVue = createLocalVue()

localVue.component('combat-logs-modal', CombatLogsModal)
localVue.component('tutorial-modal', TutorialModal)
localVue.component('settings-modal', SettingsModal)
localVue.component('villagegrid-component', VillageGrid)

localVue.use(Vuex)


function setup(firstLogin) {
    getters = {
        firstLogin: () => {
            return firstLogin;
        },
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

    villageWrapper = mount(Village, {
        store,
        localVue,
    });
}

afterAll(() =>{
    villageWrapper.destroy()
})

// 1 Voor de eerste keer inloggen en hier een introductie tekst zien, zodat ik weet wat mijn eerste stappen moeten zijn.
// 2 Als ik voor de tweede keer in log dat ik niet nog een keer een introductie tekst te zien krijg.
describe('Village', () => {
    it('should show tutorial model when you login for the first time', () => {
        const firstTimeLogin = true;
        setup(firstTimeLogin);
        const actualText = villageWrapper.find('#elwrick-pintbreaker-header').text()

        const expectedMessage = "Elwrick Pintbreaker"
        expect(actualText).toBe(expectedMessage)
    });

    it('should not show tutorial model when you login for the first time', () => {
        const firstTimeLogin = true;
        setup(firstTimeLogin);
        const actualText = villageWrapper.find('#elwrick-pintbreaker-header').text()

        const expectedMessage = "Elwrick Pintbreaker"
        expect(actualText).toBe(expectedMessage)
    });
});