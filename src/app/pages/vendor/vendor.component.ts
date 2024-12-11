import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Event} from '../../model/event';
import {VendorService} from '../../service/vendor.service';
import {EventService} from '../../service/event.service';
import {Vendor} from '../../model/user';
import {Ticket} from '../../model/Ticket';
import {TicketService} from '../../service/ticket.service';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-vendor',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './vendor.component.html',
  standalone: true,
  styleUrl: './vendor.component.css'
})
export class VendorComponent implements OnInit {
  vendorService = inject(VendorService);
  ticketService = inject(TicketService);
  router = inject(Router);
  eventObj: Event = new Event();
  eventForm!: NgForm;
  eventService = inject(EventService);
  events!: Event[];
  vendor!: Vendor;


  isModalOpen: boolean = false;
  ticketCounts: number[] = []; // Array to hold counts for all events
  tickets: Ticket[] = [];
  isPolling: boolean = true;
  isEventsActive: boolean = true;
  isPurchasedListActive: boolean = false;

  onOpenAddEvent(): void {
    this.isModalOpen = true;
  }

  onShowEvents(): void {
    this.isEventsActive = true;
    this.isPurchasedListActive = false;
  }

  closeEventModal(): void {
    this.isModalOpen = false;
    if (this.eventForm) {
      this.eventForm.reset(); // Reset the form
    }
  }

  onAddEvent(eventForm: NgForm): void {
    this.eventForm = eventForm;
    if (this.eventForm.valid) {
      this.eventObj.eventDateTime = this.formatDateTime(this.eventObj.eventDateTime) // make date meaningful
      this.vendorService.createEvent(this.eventObj).subscribe((res: any) => {
        if (res != null) {
          alert('Event Created Successfully');
          this.router.navigate(['/vendor']);
        } else {
          alert('Event create failed');
        }
      })
      eventForm.reset(); // Reset form after submission
      this.closeEventModal(); // Close modal
    } else {
      alert('Please fill in all required fields.');
    }
  }

  formatDateTime(original: string): string {
    // Parse the input string into a Date object
    const date = new Date(original);

    // Format the date (Month day, Year)
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Format the time (HH:MM AM/PM)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${(hours % 12 || 12)}.${minutes < 10 ? '0' + minutes : minutes} ${period}`;

    // Combine date and time into the final format
    return `${formattedDate} • ${formattedTime} IST`;
  }


  getEvents(): void {
    this.eventService.getEvents().subscribe((res: any) => {
      this.events = res;
      this.ticketCounts = this.events.map(() => 1); // Initialize counts for all events
    });
  }

  increaseCount(index: number): void {
    this.ticketCounts[index]++;
  }

  decreaseCount(index: number): void {
    if (this.ticketCounts[index] > 1) {
      this.ticketCounts[index]--;
    }
  }

  onReleaseTickets(index: number): void {
    this.vendorService.releaseTickets(this.vendor.id, this.ticketCounts[index], this.events[index]).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          alert(`${this.ticketCounts[index]} ticket(s) released successfully.`);
          this.router.navigate(['/vendor']);
        } else {
          alert('Ticket release failed.');
        }
      },
      error: () => {
        alert('System not running to release tickets.');
      },
    });
  }

  onShowPurchasedTickets() {
    this.isPurchasedListActive = true;
    this.isEventsActive = false;
    const poll = (): void => {
      if (!this.isPolling) return; // Exit if polling is disabled

      this.ticketService.getPurchasedTickets(this.vendor.id).subscribe({
        next: (res: Ticket[]) => {
          this.tickets = res; // Update the ticket list
          setTimeout(poll, 5000); // Continue polling after 5 seconds
        },
        error: (err: any) => {
          console.error('Error fetching tickets:', err);
          setTimeout(poll, 5000); // Retry after 5 seconds on error
        }
      });
    };

    poll(); // Invoke the polling function
  }


  ngOnInit(): void {
    const localObj = localStorage.getItem('ticketWave');
    if (localObj != null) {
      this.vendor = JSON.parse(localObj);
      this.getEvents();
    }

  }
}
