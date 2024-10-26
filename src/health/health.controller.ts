import { Controller, Get, HttpCode, Version } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller()
export class HealthController {
  @ApiTags("Health Check")
  @ApiOperation({
    description: "This method checks the health of the end points",
    summary: "Check health",
  })
  @Get("health")
  getHealthStatus(): object {
    return {
      status: 200,
      message:'all good guys!!'
    };
  }
}
