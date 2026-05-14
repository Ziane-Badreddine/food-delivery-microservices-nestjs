export class HandleOrderReady {
  orderId: string;
  customerName: string;
  item: string;

  constructor(orderId: string, customerName: string, item: string) {
    this.orderId = orderId;
    this.customerName = customerName;
    this.item = item;
  }
}
