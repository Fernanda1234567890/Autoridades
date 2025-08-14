import { Module } from '@nestjs/common';
import { CargoRegularService } from './cargo-regular.service';
import { CargoRegularController } from './cargo-regular.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoRegular } from './entities/cargo-regular.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CargoRegular])],
  controllers: [CargoRegularController],
  providers: [CargoRegularService],
})
export class CargoRegularModule {}
