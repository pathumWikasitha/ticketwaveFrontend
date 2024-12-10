import {Component, inject, OnInit} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {Customer} from '../../model/user';
import {Ticket} from '../../model/Ticket';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-bookings',
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './bookings.component.html',
  standalone: true,
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  customerService = inject(CustomerService);
  customer: Customer = new Customer();
  loginObj!: any;
  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.loginObj = localStorage.getItem('ticketWave')
    if (this.loginObj != null) {
      this.customer = JSON.parse(this.loginObj);
      this.customerService.customerBookings(this.customer.id).subscribe({
        next: (response: Ticket[] | null) => {
          if (response != null) {
            this.tickets = response;
          }
        }, error(err: any) {
          console.log(err);
        }
      });
    }

  }
}
