import { CacheKey, CacheTTL } from '@nestjs/common';
import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/cached')
  async getHelloCached(): Promise<string> {
    return this.appService.getHello();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @Get('/ttl-cached')
  async getHelloTimelyCached(): Promise<string> {
    return this.appService.getHello();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('ABC')
  @Get('/custom-key-cached')
  async getHelloCustomKeyCached(): Promise<string> {
    return this.appService.getHello();
  }
}
