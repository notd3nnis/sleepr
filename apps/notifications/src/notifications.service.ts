import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.getOrThrow<string>('SMTP_USER'),
        clientId: this.configService.getOrThrow<string>(
          'GOOGLE_OAUTH_CLIENT_ID',
        ),
        clientSecret: this.configService.getOrThrow<string>(
          'GOOGLE_OAUTH_CLIENT_SECRET',
        ),
        refreshToken: this.configService.getOrThrow<string>(
          'GOOGLE_OAUTH_REFRESH_TOKEN',
        ),
      },
    });
  }

  async notifyEmail({ email }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.getOrThrow<string>('SMTP_USER'),
      to: email,
      subject: 'Sleepr Notification',
      text: 'Your reservation has been confirmed.',
    });
  }
}
