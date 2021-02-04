import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

import { NotCachedController } from './notCached.controller';
import { AppService } from './app.service';

describe('NotCachedController', () => {
  let notCachedController: NotCachedController;

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
      controllers: [NotCachedController],
      providers: [
        AppService,
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
      ],
    }).compile();

    notCachedController = app.get<NotCachedController>(NotCachedController);
  });

  describe('Not Cached Controller', () => {
    it('should be defined', () => {
      expect(notCachedController).toBeDefined();
    });
  });
});
