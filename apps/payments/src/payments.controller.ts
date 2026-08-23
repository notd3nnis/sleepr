import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';
import Stripe from 'stripe';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  createCharge(
    @Payload() data: CreateChargeDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.paymentsService.createCharge(data);
  }
}
