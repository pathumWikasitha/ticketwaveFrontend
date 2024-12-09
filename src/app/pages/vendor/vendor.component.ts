import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Event} from '../../model/event';
import {VendorService} from '../../service/vendor.service';
import {EventService} from '../../service/event.service';
import {Vendor} from '../../model/user';
import {Configuration} from '../../model/configuration';
import {TicketService} from '../../service/ticket.service';
import {Ticket} from '../../model/Ticket';


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
  eventObj: Event = new Event();
  eventForm!: NgForm;
  eventService = inject(EventService);
  ticketService = inject(TicketService);
  events!: Event[];
  vendor!: Vendor;


  isModalOpen: boolean = false;
  ticketCount!: number[];
  tickets: Ticket[] = [];

  onOpenAddEvent(): void {
    this.isModalOpen = true;
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


  getEvents() {
    this.eventService.getEvents().subscribe((res: any) => {
      this.events = res;
      this.ticketCount = this.events.map(() => 1);
    });
  }

  increaseCount(eventId: number): void {
    this.ticketCount[eventId]++;
  }

  decreaseCount(eventId: number): void {
    if (this.ticketCount[eventId] > 1) {
      this.ticketCount[eventId]--;
    }
  }

  onReleaseTickets(eventId: number): void {
    debugger;
    this.vendorService.releaseTickets(this.vendor.id, this.ticketCount[eventId], this.events[eventId]).subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert(this.ticketCount[eventId] + ' ticket released successfully.');
        } else {
          alert('ticket release failed');
        }
      }, error(err) {
        alert('System not running to release tickets.');
      }
    });
  }


  // // Method to continuously poll for new tickets
  // getTicketDetails(): void {
  //   this.ticketService.getNewTicketDetails().subscribe(
  //     (ticket: Ticket) => {
  //       // Add the new ticket to the table
  //       this.tickets.push(ticket);
  //       // Continue long-polling
  //       this.getTicketDetails();
  //     },
  //     (error) => {
  //       console.error('Polling error:', error);
  //       setTimeout(() => this.getTicketDetails(), 5000);  // Retry after a short delay
  //     }
  //   );
  // }


  ngOnInit(): void {
    const localObj = localStorage.getItem('ticketWave');
    if (localObj != null) {
      this.vendor = JSON.parse(localObj);
      this.getEvents();
      // this.getTicketDetails()
    }
  }


}
