import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitType } from './unit-type/entities/unit-type.entity';
import { UnitTypeSeeder } from './unit-type/unit-type.seeder';
import { ConfigModule } from '@nestjs/config';
import { UnitTypeSeederModule } from './unit-type/unit-type-seeder.module';
//import { RegularPosition } from './regular-position/entities/regular-position.entity';
//import { RegularPositionSeederModule } from './regular-position/regular-position-seeder.module';
//import { RegularPositionSeeder } from './regular-position/regular-position.seeder';

seeder({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia esto según tu base de datos
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456789',
      database: process.env.DB_DATABASE || 'uatf_autoridades',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UnitTypeSeederModule,
  ],
  providers: [],
}).run([UnitTypeSeeder]);
