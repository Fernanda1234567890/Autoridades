import { Module } from '@nestjs/common';
import { Users1Service } from './users1.service';
import { Users1Controller } from './users1.controller';

@Module({
  controllers: [Users1Controller],
  providers: [Users1Service],
})
export class Users1Module {}
