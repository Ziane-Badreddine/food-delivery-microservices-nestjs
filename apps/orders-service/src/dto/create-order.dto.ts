import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName!: string;
  @IsNotEmpty()
  @IsString()
  item!: string;
  @IsNotEmpty()
  @IsInt()
  quantity!: number;
}
