import {
  Module,
  CacheModule,
  CacheInterceptor,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      // store: redisStore,
      host: 'localhost',
      port: 6379,
      max: 10,
      ttl: 3600,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  // constructor(@Inject(CACHE_MANAGER) cacheManager) {
    // const client = cacheManager.store.getClient();
    
    // client.on('error', error => {
    //   console.error('REDIS ERROR', error);
    //   console.log(client)
    // });
  // }
}
