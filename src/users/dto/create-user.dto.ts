import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fname: string;

  @IsNotEmpty()
  lname: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsDate()
  createdDate: Date;

  @IsDate()
  updatedDate: Date;
}
