import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

describe('auth config', () => {
  it('exposes JWT_EXPIRATION as a number, not a string', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: './apps/auth/.env',
          validationSchema: Joi.object({
            MONGODB_URI: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION: Joi.number().required(),
            PORT: Joi.number().required(),
          }),
        }),
      ],
    }).compile();

    const configService = moduleRef.get(ConfigService);
    expect(typeof configService.getOrThrow('JWT_EXPIRATION')).toBe('number');
  });
});
