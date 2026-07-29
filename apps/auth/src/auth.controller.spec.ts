import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Types } from 'mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDocument } from './users/models/user.schema';

describe('AuthController', () => {
  let authController: AuthController;
  let response: Response;
  let setCookie: jest.Mock;

  const user: UserDocument = {
    _id: new Types.ObjectId(),
    email: 'test@example.com',
    password: 'hashed',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: ConfigService, useValue: { getOrThrow: () => 3600 } },
        { provide: JwtService, useValue: { sign: () => 'signed-token' } },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    setCookie = jest.fn();
    response = { cookie: setCookie } as unknown as Response;
  });

  describe('login', () => {
    it('should set the Authentication cookie and return the user', () => {
      expect(authController.login(user, response)).toBe(user);
      expect(setCookie).toHaveBeenCalledWith(
        'Authentication',
        'signed-token',
        expect.objectContaining({ httpOnly: true }),
      );
    });
  });
});
