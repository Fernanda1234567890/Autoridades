import { Module } from '@nestjs/common';
import { OrganizationPersonService } from './organization-person.service';
import { OrganizationPersonController } from './organization-person.controller';

@Module({
  controllers: [OrganizationPersonController],
  providers: [OrganizationPersonService],
})
export class OrganizationPersonModule {}
