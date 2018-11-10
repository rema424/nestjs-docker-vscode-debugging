import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    const first: number = 100;
    const second: number = 200;
    return `Hello World!  ${first + second}`;
  }
}
