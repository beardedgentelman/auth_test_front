import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { VerificationGuard } from '../auth/guards/verification.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-user')
  async getUser(@Req() req: Request) {
    const { user } = req;
    return await this.userService.getUser(+user);
  }

  @UseGuards(JwtAuthGuard, VerificationGuard)
  @Put(':id')
  async update(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    return await this.userService.update(userId, body);
  }

  @UseGuards(JwtAuthGuard, VerificationGuard)
  @Delete(':id')
  async delete(@Param('id') userId: number) {
    return await this.userService.delete(userId);
  }
}
