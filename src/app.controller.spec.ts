import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: {} }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root route', () => {
    it('should return "Ready to get Discounts...."', () => {
      expect(appController.getHello()).toBe('Ready to get Discounts....');
    });
  });
});
