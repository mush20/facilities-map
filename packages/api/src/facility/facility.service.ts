import { Injectable } from "@nestjs/common";
import { FacilityDto } from "./facility.dto";
import { FacilitiesRepository } from "./facility.repository";

@Injectable()
export class FacilityService {

    constructor(private facilitiesRepository: FacilitiesRepository) {
    }

    list(): Promise<FacilityDto[]> {
        return this.facilitiesRepository.findAll();
    }
}
