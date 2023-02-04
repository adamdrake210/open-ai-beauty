import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class SignupInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  firstname?: string;

  lastname?: string;
}
