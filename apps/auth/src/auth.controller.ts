import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@app/common';
import { UserDocument } from './users/models/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.login(user, response);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  // JwtAuthGuard validates the payload's Authentication token and passport
  // attaches the resolved user to that same payload object.
  authenticate(@Payload() data: { user?: UserDocument }) {
    return data.user;
  }
}
