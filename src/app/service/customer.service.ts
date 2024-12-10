import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/event'
import {Ticket} from '../model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl: string = 'http://localhost:8080/api/v1/ticket/';

  constructor(private http: HttpClient) {
  }

  purchaseTicket(customerId: number, ticketCount: number, event: Event): Observable<HttpResponse<any>> {
    return this.http.post(`http://localhost:8080/api/v1/customer/${customerId}/purchaseTicket/${ticketCount}`, event, {
      observe: 'response', // Include the full HTTP response
    });
  }

  customerBookings(customerId: number): Observable<Ticket[]>  {
    return this.http.get<Ticket[]>(this.apiUrl + `bookings/${customerId}`);
  }
}
