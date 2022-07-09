import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import { electronicsId, laptopsId } from '../category/category.seed';

@Injectable()
export class ProductSeed implements OnApplicationBootstrap {
  products = [
    {
      name: 'Smart Watch',
      category: electronicsId,
    },
    {
      name: 'Lenovo Legion 5',
      category: laptopsId,
    },
    {
      name: 'Tablet',
      category: electronicsId,
      discount: 5,
    },
  ];

  constructor(
    @InjectModel(Product.name)
    private model: Model<Product>,
  ) {}

  async onApplicationBootstrap() {
    const existingProducts = await this.model.count();

    if (existingProducts > 0) return;

    this.model.insertMany(this.products);
  }
}
