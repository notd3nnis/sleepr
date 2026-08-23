import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CreateChargeDto } from '@app/common';
import Stripe from 'stripe';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  const createCharge = jest.fn();

  beforeEach(async () => {
    createCharge.mockReset();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [{ provide: PaymentsService, useValue: { createCharge } }],
    }).compile();

    paymentsController = app.get<PaymentsController>(PaymentsController);
  });

  describe('createCharge', () => {
    it('delegates the payload to PaymentsService', async () => {
      const paymentIntent = {
        id: 'pi_123',
      } as Stripe.Response<Stripe.PaymentIntent>;
      createCharge.mockResolvedValue(paymentIntent);

      const dto: CreateChargeDto = {
        amount: 10,
        card: {
          cvc: '413',
          exp_month: 12,
          exp_year: 2030,
          number: '4242424242424242',
        },
      };

      await expect(paymentsController.createCharge(dto)).resolves.toBe(
        paymentIntent,
      );
      expect(createCharge).toHaveBeenCalledWith(dto);
    });
  });
});
