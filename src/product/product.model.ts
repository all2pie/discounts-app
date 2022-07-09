import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseModel } from '../common/base.model';
import { Category } from '../category/category.model';

@Schema({ timestamps: true })
export class Product extends BaseModel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: string;

  @Prop()
  discount?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
