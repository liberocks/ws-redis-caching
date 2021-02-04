import { CacheKey, CacheTTL } from '@nestjs/common';
import {
  CacheInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(CacheInterceptor)
@Controller()
export class CachedController {
  constructor(private readonly appService: AppService) {}

  @Get('/cached')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('/cached')
  async postHelloCached(): Promise<string> {
    return this.appService.getHello();
  }

  @CacheTTL(30)
  @Get('/ttl-cached')
  async getHelloTimelyCached(): Promise<string> {
    return this.appService.getHello();
  }

  @CacheKey('ABC')
  @Get('/custom-key-cached')
  async getHelloCustomKeyCached(): Promise<string> {
    return this.appService.getHello();
  }
}
