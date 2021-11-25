import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UesrRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UesrRepository)
    private userRepository: UesrRepository,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const findUser = await this.userRepository.findOne({ username });
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      return 'LOGIN SUCCESS';
    } else {
      throw new UnauthorizedException('LOGIN FAILED');
    }
  }
}
