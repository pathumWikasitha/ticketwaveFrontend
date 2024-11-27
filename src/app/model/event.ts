export class Event {
  eventId: number;
  eventName: string;
  ticketPrice: number;
  eventDescription: string;
  eventLocation: string;
  eventDateTime: string;
  imageUrl: string;

  constructor() {
    this.eventId = 0;
    this.eventName = '';
    this.ticketPrice = 0;
    this.eventDescription = '';
    this.eventLocation = '';
    this.eventDateTime = '';
    this.imageUrl = '';
  }

}
