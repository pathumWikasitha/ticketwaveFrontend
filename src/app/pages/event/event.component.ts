import {Component, inject, OnInit} from '@angular/core';
import {EventService} from '../../service/event.service';
import {Event} from '../../model/event';
import { CommonModule } from '@angular/common';
import {CustomerService} from '../../service/customer.service';
import {User} from '../../model/user';

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

  onBuyTickets() {
    const localData = localStorage.getItem('ticketWave');
    if (localData != null) {
      const user: User = JSON.parse(localData);
      if (user?.role === 'CUSTOMER' && user?.id) {
        this.customerService.purchaseTicket(user.id, this.ticketCount).subscribe({
          next: (response) => {
            // Access the HTTP status code
            if (response.status === 202) {
              alert('Tickets purchased successfully!');
            } else {
              alert(`Request processed, but status code: ${response.status}`);
            }
          },
          error: (error) => {
            // Handle error response
            console.error('Error purchasing tickets:', error);
            alert(`Failed to purchase tickets. HTTP status: ${error.status}`);
          },
        });
      } else {
        alert('Invalid user data. Please log in as a customer.');
      }
    } else {
      alert('Please log in to continue.');
    }


  }
}
