import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // اینجا UserEntity رو ایمپورت کن
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // باید اکسپورت بشه تا در AuthModule استفاده بشه
})
export class UsersModule {}
