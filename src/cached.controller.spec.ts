import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

import { CachedController } from './cached.controller';
import { AppService } from './app.service';

describe('CachedController', () => {
  let cachedController: CachedController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          store: redisStore,
          host: 'localhost',
          port: 6379,
          max: 10,
          ttl: 3600,
        }),
      ],
      controllers: [CachedController],
      providers: [
        AppService,
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
      ],
    }).compile();

    cachedController = app.get<CachedController>(CachedController);
  });

  describe('Cached Controller', () => {
    it('should be defined', () => {
      expect(cachedController).toBeDefined();
    });
  });
});
