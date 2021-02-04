import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class NotCachedController {
  constructor(private readonly appService: AppService) {}

  @Get('/not-cached')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/service-cached')
  async getServiceCachedHello(): Promise<string> {
    return this.appService.cachedHello();
  }
}
