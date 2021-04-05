import { Injectable } from "@nestjs/common";
import trucksJson from "./data/facility.data.json";
import { FacilityDto } from "./facility.dto";

@Injectable()
export class FacilitiesRepository {

    findAll(): Promise<FacilityDto[]> {
        return Promise.resolve(trucksJson);
    }
}