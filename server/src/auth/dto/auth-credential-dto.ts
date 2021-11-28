import { IsNotEmpty } from 'class-validator';
export class AuthCredentialDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  password: string;

  userNickName: string;
}
