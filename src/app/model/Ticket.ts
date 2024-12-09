import {Customer, Vendor} from './user';
import {Event} from './event';

export class Ticket {
  event: Event;
  vendor: Vendor;
  customer: Customer;

  constructor() {
    this.customer = new Customer();
    this.vendor = new Vendor();
    this.event = new Event();
  }
}
