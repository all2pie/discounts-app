import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CategorySchema, Category } from './category/category.model';
import { Product, ProductSchema } from './product/product.model';
import { CategorySeed } from './category/category.seed';
import { ProductSeed } from './product/product.seed';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'Discounts',
    }),
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, CategorySeed, ProductSeed],
})
export class AppModule {}
