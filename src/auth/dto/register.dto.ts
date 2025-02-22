import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
