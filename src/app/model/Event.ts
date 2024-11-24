export class Event {
  eventId: number;
  eventName: string;
  ticketPrice: number;
  eventDescription: string;
  eventDate: Date;

  constructor() {
    this.eventId = 0;
    this.eventDate = new Date();
    this.eventDescription = '';
    this.eventName = '';
    this.ticketPrice = 0;
  }
}
