import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import House from "@/components/tiles/House";
import ConstructionTile from "@/components/tiles/ConstructionTile";

let houseWrapper;
let store;
let getters;
const localVue = createLocalVue()


localVue.component('construction-tile', ConstructionTile)
localVue.use(Vuex)

const HOUSE_TEST_DATA = require("./mockData/test_house_data.json")
const VILLAGE_TEST_DATA = require("./mockData/village_mock_data.json")

async function setupHouse(house) {
    const state = {
        village: {
            seasonsEnabled: false,
            currentSeason: 'summer',
            data: {
                ...VILLAGE_TEST_DATA,
            }
        }
    }

    const props = {
        buildingProperties: house
    }
    store = new Vuex.Store({
        state,
    })

    houseWrapper = shallowMount(House, {
        store,
        localVue,
        propsData: props
    });
}

afterEach(() =>{
    houseWrapper.destroy()
})

// TODO vragen over hoe het werkt met require etc
describe('House', () => {
    it('should show level 10 image when house is level 10', async () => {
        const houseUnderTesting = HOUSE_TEST_DATA
        houseUnderTesting.level = 15
        await setupHouse(houseUnderTesting)
        const expectedImageUrl = '../../assets/tiles/level_10/house_10.png'

       const actualImageTile = houseWrapper.vm.getTileSource()
       expect(actualImageTile).toBe(expectedImageUrl)

        // const tileImageElement = houseWrapper.find('#tile-image')
        //
        // expect(tileImageElement.element.src).toBe(expectedImageUrl)
    })

    it('should show default building image when house is under level 10', async () => {
        const houseUnderTesting = HOUSE_TEST_DATA
        houseUnderTesting.level = 1;
        await setupHouse(houseUnderTesting)
        const expectedImageUrl = '../../assets/tiles/house.png'
        const tileImageElement = houseWrapper.find('#tile-image')

        expect(tileImageElement.element.src).toBe(expectedImageUrl)
    })
});