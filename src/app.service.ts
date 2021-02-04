import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}

  async getHello(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(
        () => resolve(`[${new Date().toISOString()}] Hello world!`),
        1500,
      );
    });
  }

  async cachedHello(): Promise<string> {
    const cachedValue = await await this.cacheManager.get('XYZ');

    if (cachedValue) return cachedValue;

    return new Promise(resolve => {
      setTimeout(() => {
        const value = `[${new Date().toISOString()}] Hello world!`;
        this.cacheManager.set('XYZ', value);
        resolve(value);
      }, 1500);
    });
  }
}
