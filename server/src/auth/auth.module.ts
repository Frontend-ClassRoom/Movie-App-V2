import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UesrRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UesrRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
