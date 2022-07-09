import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from './category.model';

export const electronicsId = new Types.ObjectId();
export const laptopsId = new Types.ObjectId();

@Injectable()
export class CategorySeed implements OnApplicationBootstrap {
  categories = [
    {
      _id: electronicsId,
      name: 'Electronics',
      children: [laptopsId],
    },
    {
      _id: laptopsId,
      name: 'Laptops',
      discount: 10,
      parent: electronicsId,
    },
  ];

  constructor(
    @InjectModel(Category.name)
    private model: Model<Category>,
  ) {}

  async onApplicationBootstrap() {
    const existingCategories = await this.model.count();

    if (existingCategories > 0) return;

    this.model.insertMany(this.categories);
  }
}
