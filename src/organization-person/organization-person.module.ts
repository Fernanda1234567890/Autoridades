import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationPersonService } from './organization-person.service';
import { OrganizationPersonController } from './organization-person.controller';
import { OrganizationPerson } from './entities/organization-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationPerson])],
  controllers: [OrganizationPersonController],
  providers: [OrganizationPersonService],
  exports: [TypeOrmModule], // Opcional, solo si necesitas el repositorio fuera de este módulo
})
export class OrganizationPersonModule {}