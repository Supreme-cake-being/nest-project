import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
  @Get("/hey")
  getHey() {
    return "Hey there";
  }

  @Get("/bye")
  getBye() {
    return "Bye";
  }
}
