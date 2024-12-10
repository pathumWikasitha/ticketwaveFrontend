import {Customer, Vendor} from './user';
import {Event} from './event';

export class Ticket {
  id: number
  event: Event;
  vendor: Vendor;
  customer: Customer;

  constructor() {
    this.id = 0;
    this.customer = new Customer();
    this.vendor = new Vendor();
    this.event = new Event();
  }
}
