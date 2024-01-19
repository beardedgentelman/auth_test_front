import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerificationGuard } from './guards/verification.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(VerificationGuard)
  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto, @Res() res: Response) {
    const { email } = body;

    try {
      await this.authService.forgotPassword(email).then(() =>
        res.status(200).send({
          message:
            'The password reset link has been successfully sent to your email.',
        }),
      );
    } catch (e) {
      res.status(500).send({ message: `${e.message}` });
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto, @Res() res: Response) {
    try {
      await this.authService.resetPassword(body).then(() =>
        res.status(200).send({
          message:
            'Your password successfully reset! Now you can login with your new password',
        }),
      );
    } catch (e) {
      res.status(500).send({ message: `${e.message}` });
    }
  }

  @Post('confirm-email/:token')
  async emailConfirmation(@Param('token') token: string) {
    try {
      await this.authService.confirmEmail(token);
      return {
        message: 'Success confirmation! Now you can sign in.',
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
