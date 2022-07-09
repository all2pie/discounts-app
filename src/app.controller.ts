import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetDiscountInput } from './dto/get-discount.dto';

@Controller()
export class AppController {
  constructor(private service: AppService) {}

  @Get()
  getHello() {
    return 'Ready to get Discounts....';
  }

  @Post('getDiscountForProduct')
  async getDiscountForProduct(@Body() data: GetDiscountInput) {
    const discount = await this.service.getDiscountForProduct(data);
    return { discount };
  }
}
