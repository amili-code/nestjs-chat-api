import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, profile?: string) {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser)
      throw new BadRequestException('یوزرنیم قبلاً گرفته شده است.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      profile,
    });
    await this.userRepository.save(user);

    return { message: 'ثبت‌نام موفقیت‌آمیز' };
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user)
      throw new BadRequestException('نام کاربری یا رمز عبور اشتباه است.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestException('نام کاربری یا رمز عبور اشتباه است.');

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
