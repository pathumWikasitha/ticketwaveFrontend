import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  purchaseTicket(customerId: number, ticketCount: number): Observable<HttpResponse<any>> {
    return this.http.post(`http://localhost:8080/api/v1/customer/${customerId}/purchaseTicket/${ticketCount}`, null, {
      observe: 'response', // Include the full HTTP response
    });
  }
}
