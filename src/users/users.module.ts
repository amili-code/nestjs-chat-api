import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ثبت مدل User
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // برای استفاده در auth module
})
export class UsersModule {}
