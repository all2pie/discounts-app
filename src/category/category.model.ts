import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseModel } from '../common/base.model';

@Schema({ timestamps: true })
export class Category extends BaseModel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  parent?: string;

  @Prop({ type: [Types.ObjectId], default: [], ref: Category.name })
  children: string[];

  @Prop()
  discount?: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
