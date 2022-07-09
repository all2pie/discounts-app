import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category/category.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product/product.model';
import { GetDiscountInput } from './dto/get-discount.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async getDiscountForProduct(data: GetDiscountInput) {
    const product = await this.productModel.findOne({ name: data.productName });

    if (!product) throw new NotFoundException('Product not found');

    if (product.discount) {
      return this.calculateDiscount(data.totalPrice, product.discount);
    }

    const categoryDiscount = await this.getCategoryDiscount(product.category);

    if (categoryDiscount) {
      return this.calculateDiscount(data.totalPrice, categoryDiscount);
    }

    return -1;
  }

  private async getCategoryDiscount(categoryId: string) {
    const category = await this.categoryModel.findById(categoryId);
    if (category.discount) {
      return category.discount;
    }

    if (category.parent) {
      return this.getCategoryDiscount(category.parent);
    }
  }

  private calculateDiscount(price: number, discountPercentage: number) {
    const discount = price * (discountPercentage / 100);
    return price - discount;
  }
}
