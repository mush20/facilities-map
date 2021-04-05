import { Controller, Get } from "@nestjs/common";

@Controller("facilities")
export class FacilityController {
  @Get()
  list() {
    return Promise.resolve([]);
  }
}
