import axios from "axios";
import { MutationAction, namespace } from "nuxt-property-decorator";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { from, of } from "rxjs";
import { retryWhen, take, tap, delay, switchMap } from "rxjs/operators";

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

function persistData(items: Facility[]) {

    if (items.length > 0) {
        window.localStorage.setItem("items", JSON.stringify(items));
        return items;
    }

    return JSON.parse(window.localStorage.getItem("items") ?? "[]");
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

        // it will try to reach the api 5 times
        const data = await from(axios.get(`/api/facilities`)).pipe(
            switchMap((response) => of(response.status === 200 ? response.data : [])),
            retryWhen(errors => errors.pipe(
                delay(2000),
                tap(() => console.log("Retrying connection...")),
                take(5)
            ))
        ).toPromise();

        const items = persistData(data ?? []);

        return { items };
    }
}

export const Facilities = namespace("facilities");
