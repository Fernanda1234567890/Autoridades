import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // ✅ IMPORTAR TypeOrmModule
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity'; // ✅ IMPORTAR User

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Exponer UserRepository
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Para que otros módulos (AuthModule) puedan usar UserService
})
export class UserModule {}
