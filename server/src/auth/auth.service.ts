import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UesrRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UesrRepository)
    private userRepository: UesrRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ token: string; userNickName: string }> {
    const { userId, password } = authCredentialDto;
    const findUser = await this.userRepository.findOne({ userId });
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { userId };
      const accessToken = await this.jwtService.sign(payload);
      return {
        token: accessToken,
        userNickName: findUser.userNickName || findUser.userId,
      };
    } else {
      throw new UnauthorizedException('LOGIN FAILED');
    }
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  deleteUser(id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
