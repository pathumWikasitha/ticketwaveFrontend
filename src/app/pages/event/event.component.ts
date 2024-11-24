import {Component, inject, OnInit} from '@angular/core';
import {EventService} from '../../service/event.service';
import {Event} from '../../model/event';
import {CustomerService} from '../../service/customer.service';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  standalone: true,
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  eventService = inject(EventService);
  customerService = inject(CustomerService);

  events: Event[] = [];
  ticketCount: number = 1;

  ngOnInit(): void {
    this.showEvent();
  }

  showEvent() {
    this.eventService.getEvent().subscribe((res: any) => {
      if (res != null) {
        this.events = res;
      }
    });
  }

  increaseCount(): void {
    this.ticketCount++;
  }

  decreaseCount(): void {
    if (this.ticketCount > 0) {
      this.ticketCount--;
    }
  }

  onBuyTickets(){
    this.customerService.purchaseTicket(1,this.ticketCount).subscribe((res: any) => {
      if (res != null) {
        alert(res)
      }
    })
  }
}
