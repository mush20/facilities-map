import { MutationAction, namespace } from "nuxt-property-decorator";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface Facility {
    id: string;
    name: string;
    locationId: number;
    facilityType: string;
    location: string;
    address: string;
    foodItems: string;
    latitude: number;
    longitude: number;
    status: string;
}

function filterResults(text: string, item: Facility) {
    const regex = new RegExp(text, "i");
    return [
        item.name,
        item.address,
        item.location,
        item.foodItems,
        item.status,
        item.facilityType
    ].filter((value) => value && regex.test(value)).length > 0;
}

@Module({
    name: "facilities",
    namespaced: true,
    stateFactory: true
})
export default class FacilitiesModule extends VuexModule {
    items: Facility[] = [];
    selected: Facility | null = null;
    results: Facility[] = [];
    loading = false;

    @Mutation
    search(text: string) {
        this.results =
            text === ""
                ? []
                : this.items.filter((item) => filterResults(text, item));
    }

    @Mutation
    setSelected(selected: string) {
        this.selected = this.items.find((item) => item.id === selected) ?? null;
        this.results = [];
    }

    @MutationAction({ mutate: ["items"] })
    async fetchAll() {
        const response = await fetch(`${process.env.API_URL}/facilities`);
        const items = await response.json();

        return { items };
    }
}

export const Facilities = namespace("facilities");
