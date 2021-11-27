import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UesrRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

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
  ): Promise<{ accessToken: string }> {
    const { userId, password } = authCredentialDto;
    const findUser = await this.userRepository.findOne({ userId });
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { userId };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('LOGIN FAILED');
    }
  }
}
