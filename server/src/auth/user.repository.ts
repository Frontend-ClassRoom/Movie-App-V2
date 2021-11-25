import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ERROR_CODE } from 'src/constants/error';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential-dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UesrRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      const { code } = error;
      if (code === ERROR_CODE.ALREADY_USERNAME) {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
