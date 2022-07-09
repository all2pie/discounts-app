import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class GetDiscountInput {
  @ApiProperty({
    example: 'Lenovo Legion 5',
  })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({
    example: 100,
  })
  @IsPositive()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({
    description: 'Only dummy, Auth not Implemented',
    example: '62c99410a9a09eb754c9469d',
  })
  @IsMongoId()
  userId: string;
}
