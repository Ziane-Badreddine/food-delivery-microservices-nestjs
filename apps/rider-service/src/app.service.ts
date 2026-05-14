import { RIDERS } from './constants/rider';
import { Injectable } from '@nestjs/common';
import { HandleOrderReady } from './types/handle-order-ready';
import { db } from './db';
import { dispatches } from './db/schema';

@Injectable()
export class AppService {
  public async dispatchRider(data: HandleOrderReady) {
    const rider = RIDERS[Math.floor(Math.random() * RIDERS.length)];
    const [dispatch] = await db
      .insert(dispatches)
      .values({
        ...data,
      })
      .returning();

    console.log(`Dispatch saved with ID : ${dispatch.id}`);
    console.log(
      `${rider} is on the way with your item ${dispatch.item} for customer ${dispatch.customerName}`,
    );
  }
}
