import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HandleOrderReady } from './types/handle-order-ready';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('order_ready')
  public async handleOrderReady(@Payload() data: HandleOrderReady) {
    console.log(` Rider received dispatch for order: ${data.orderId}`);

    await this.appService.dispatchRider(data);
  }
}
