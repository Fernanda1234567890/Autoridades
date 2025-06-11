import { seeder } from 'nestjs-seeder';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitTypeModule } from './unit-type/unit-type.module';
import { UnitType } from './unit-type/entities/unit-type.entity';
import { RegularPositionModule } from './regular-position/regular-position.module';
import { OrganizationModule } from './organization/organization.module';
import { RegularPosition } from './regular-position/entities/regular-position.entity';
import { Organization } from './organization/entities/organization.entity';
import { PersonModule } from './person/person.module';
import { OrganizationPersonModule } from './organization-person/organization-person.module';
import { StudentModule } from './student/student.module';
import { AdministrativeModule } from './administrative/administrative.module';
import { ProfessorModule } from './professor/professor.module';
import { UnitModule } from './unit/unit.module';
import { IntermediatePositionModule } from './intermediate-position/intermediate-position.module';
import { AdministrativeRegularPositionUnitModule } from './administrative-regular-position-unit/administrative-regular-position-unit.module';
import { IntermediatePositionProfessorModule } from './intermediate-position-professor/intermediate-position-professor.module';
import { Person } from './person/entities/person.entity';
import { OrganizationPerson } from './organization-person/entities/organization-person.entity';
import { Student } from './student/entities/student.entity';
import { Administrative } from './administrative/entities/administrative.entity';
import { Professor } from './professor/entities/professor.entity';
import { Unit } from './unit/entities/unit.entity';
import { IntermediatePosition } from './intermediate-position/entities/intermediate-position.entity';
//import { AdministrativeController } from './administrative/administrative.controller';
//import { IntermediatePositionController } from './intermediate-position/intermediate-position.controller';
//import { AdministrativeRegularPositionUnitService } from './administrative-regular-position-unit/administrative-regular-position-unit.service';
import { AdministrativeRegularPositionUnit } from './administrative-regular-position-unit/entities/administrative-regular-position-unit.entity';
import { IntermediatePositionProfessor } from './intermediate-position-professor/entities/intermediate-position-professor.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users1Module } from './users1/users1.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'uatf_autoridades',
      
      entities: [ 
        UnitType,
        Unit,
        IntermediatePosition,
        IntermediatePositionProfessor,
        RegularPosition,
        AdministrativeRegularPositionUnit,
        Student,
        Administrative,
        Professor,
        Person,
        OrganizationPerson,
        Organization,
        
      ],
      synchronize: true,
    }),
    UnitTypeModule,
    UnitModule,
    IntermediatePositionModule,
    IntermediatePositionProfessorModule,
    RegularPositionModule,
    AdministrativeRegularPositionUnitModule,
    StudentModule,
    AdministrativeModule,
    ProfessorModule,
    PersonModule,
    OrganizationPersonModule,
    OrganizationModule,
   
    
    
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
