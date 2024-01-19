import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../user/roles/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role, { message: 'Invalid role' })
  role: Role;
}
