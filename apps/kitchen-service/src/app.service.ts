import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HandleOrderCreated } from './types/handle-order-created';
import { db } from './db';
import { tickets } from './db/schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('RIDER_SERVICE') private readonly riderClient: ClientProxy,
  ) {}

  public async processOrder(data: HandleOrderCreated) {
    const [ticket] = await db
      .insert(tickets)
      .values({ ...data })
      .returning();

    console.log(`Ticket saved to Kichen DB with ID : ${ticket.id}`);

    await new Promise((res) => setTimeout(res, 2000));

    this.riderClient.emit('order_ready', {
      orderId: ticket.orderId,
      customerName: ticket.customerName,
      item: ticket.item,
    });

    console.log('Event Emitted to the rider_queue (Order ready to pick up ');
  }
}
