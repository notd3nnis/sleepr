import { Controller, Get, UsePipes } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { date } from 'joi';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { validate } from 'class-validator';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new validatation)
  @EventPattern('notify_email')
  async notifyEmail(@Payload() date:NotifyEmailDto)
  this.notificationsService.notifyEmail(data);
}
