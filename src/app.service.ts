import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '"UNIVERSIDAD AUTONOMAS TOMAS FRIAS"';
  }
}
