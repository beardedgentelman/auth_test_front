import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const email = userDto.email;
    const userEmail = await this.userRepository.findOneBy({
      email,
    });

    if (userEmail) {
      throw new ConflictException('User with this email is already exist!');
    }
    const newUser = await this.userRepository.save(userDto);
    return await this.userRepository.findOneBy({ id: newUser.id });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async update(id: number, userDate: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const updatedUser = { ...user, ...userDate };

    const userWithUpdate = await this.userRepository.save({
      ...updatedUser,
    });

    return await this.userRepository.findOneBy({ id: userWithUpdate.id });
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.remove(user);
  }
}
