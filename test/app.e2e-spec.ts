import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App End-to-End', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('checks proper discount is applied', async () => {
    const res = await request(app.getHttpServer())
      .post('/getDiscountForProduct')
      .send({
        productName: 'Tablet',
        totalPrice: 100,
        userId: '62c99410a9a09eb754c9469d',
      })
      .expect(201);

    expect(res.body.discount).toEqual(95);
  });

  afterAll(async () => {
    await app.close();
  });
});
