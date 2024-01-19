import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class VerificationGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const email = request.body.email;

      if (!email) {
        throw new NotFoundException('User with this email is not found!');
      }

      const foundUser = await this.userRepository.findOneBy({ email: email });

      if (!(foundUser && foundUser.verification === true)) {
        throw new ForbiddenException('Email is not verified');
      }

      return true;
    } catch (e) {
      throw new ForbiddenException('Email is not verified');
    }
  }
}
