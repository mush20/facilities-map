import { Controller, Get } from "@nestjs/common";
import { FacilityService } from "./facility.service";

@Controller("facilities")
export class FacilityController {

  constructor(private facilityService: FacilityService) {}

  @Get()
  list() {
    return this.facilityService.list();
  }
}
