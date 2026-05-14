import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HandleOrderCreated } from './types/handle-order-created';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('order_created')
  public async handleOrderCreated(@Payload() date: HandleOrderCreated) {
    console.log(`Kitchen received order: ${date.orderId}`);
    return this.appService.processOrder(date);
  }
}
