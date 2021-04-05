import { Module } from "@nestjs/common";
import { FacilityController } from "./facility.controller";
import { FacilitiesRepository } from "./facility.repository";
import { FacilityService } from "./facility.service";

@Module({
  controllers: [FacilityController],
  providers: [FacilityService, FacilitiesRepository]
})
export class FacilityModule { }
