import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { db } from './db';
import { orders } from './db/schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('KITCHEN_SERVICE') private readonly KichenClient: ClientProxy,
  ) {}
  public async createOrder(dto: CreateOrderDto) {
    const [order] = await db
      .insert(orders)
      .values({
        ...dto,
      })
      .returning();

    console.log(`Order saved to DB : id ${order.id}`);

    this.KichenClient.emit('order_created', {
      orderId: order.id,
      customerName: order.customerName,
      item: order.item,
      quantity: order.quantity,
    });

    console.log(`Event emitted to kitchen queue`);

    return {
      succes: true,
      orderId: order.id,
    };
  }
}
