import { AuthCredentialDto } from './dto/auth-credential-dto';
import { Injectable } from '@nestjs/common';
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
}
