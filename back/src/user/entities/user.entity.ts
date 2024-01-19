import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/roles.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Name', type: 'varchar' })
  name: string;

  @Column({ name: 'Email', type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ name: 'Password', type: 'varchar' })
  password: string;

  @Column({ name: 'Verification', type: 'boolean', default: false })
  verification: boolean;

  @Exclude()
  @Column({ name: 'Role', type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Exclude()
  @Column({ name: 'Forgot_Password_Link', type: 'varchar', nullable: true })
  forgotPasswordLink: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
