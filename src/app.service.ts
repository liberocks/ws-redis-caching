import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(
        () => resolve(`[${new Date().toISOString()}] Hello world!`),
        1000,
      );
    });
  }
}
