import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;
  const notifyEmail = jest.fn();

  beforeEach(async () => {
    notifyEmail.mockReset();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [{ provide: NotificationsService, useValue: { notifyEmail } }],
    }).compile();

    notificationsController = app.get<NotificationsController>(
      NotificationsController,
    );
  });

  describe('notifyEmail', () => {
    it('delegates the payload to NotificationsService', () => {
      const dto = { email: 'test@example.com' };

      notificationsController.notifyEmail(dto);

      expect(notifyEmail).toHaveBeenCalledWith(dto);
    });
  });
});
