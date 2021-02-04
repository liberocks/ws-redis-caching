import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import * as redisStore from 'cache-manager-redis-store';

import { CachedController } from './cached.controller';
import { AppService } from './app.service';
import { NotCachedController } from './notCached.controller';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      max: 10,
      ttl: 3600,
    }),
  ],
  controllers: [CachedController, NotCachedController],
  providers: [AppService],
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
