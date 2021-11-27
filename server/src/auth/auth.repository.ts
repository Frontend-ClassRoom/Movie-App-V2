import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ERROR_CODE } from 'src/constants/error';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential-dto';
import { User } from './auth.entity';

@EntityRepository(User)
export class UesrRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { userId, password, userNickName } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      userId,
      userNickName,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      const { code } = error;
      if (code === ERROR_CODE.ALREADY_USERID) {
        throw new ConflictException('Existing USER ID');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
