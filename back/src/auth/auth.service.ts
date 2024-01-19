import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from '../email/email.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject(EmailService) readonly emailService: EmailService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      const isPasswordValid = comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password!');
      }
      return user;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async registration(userDto: CreateUserDto): Promise<{ message: string }> {
    try {
      const password = encodePassword(userDto.password);
      const userData = await this.usersService.create({
        ...userDto,
        password,
      });
      const user = await this.userRepository.findOneBy({
        email: userData.email,
      });

      const email = user.email;
      const token = this.jwtService.sign({ email: email });
      const originLink = process.env.ORIGIN_LINK;
      const link = `${originLink}/confirm-email/${token}`;
      await this.emailService.sendConfirmEmailMail(email, link);

      return {
        message:
          'Registration was successful. Please confirm your e-mail address to continue your registration.',
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const token = this.jwtService.sign({ id: user.id });
    return { user, token };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('User with this email is not found!');
    }

    const uniqueString = uuidv4();
    const originLink = process.env.ORIGIN_LINK;
    const link = `${originLink}/reset-password/${uniqueString}`;
    user.forgotPasswordLink = uniqueString;
    await this.userRepository.save(user);
    await this.emailService.sendForgotPasswordMail(email, link);
  }

  async resetPassword(data: ResetPasswordDto) {
    const { password, unique } = data;

    const user = await this.userRepository.findOneBy({
      forgotPasswordLink: unique,
    });
    if (!user) {
      throw new NotFoundException('You have an invalid token.');
    }
    user.password = encodePassword(password);
    await this.userRepository.save(user);
  }

  async confirmEmail(token: string) {
    const decodedToken = this.jwtService.decode(token) as
      | { email: string }
      | string;
    if (typeof decodedToken === 'object' && 'email' in decodedToken) {
      const email = decodedToken.email;
      const user = await this.userRepository.findOneBy({ email: email });
      if (!user) {
        throw new NotFoundException('You have an invalid link.');
      } else if (user.verification === true) {
        throw new ConflictException(
          'You have already verified your email address.',
        );
      }
      user.verification = true;
      await this.userRepository.save(user);
    } else {
      throw new Error('Confirmation failed.');
    }
  }
}
