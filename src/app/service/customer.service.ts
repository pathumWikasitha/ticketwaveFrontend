import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  purchaseTicket(customerId:number ,ticketCount :number) {
    debugger;
    // @ts-ignore
    return this.http.post(`http://localhost:8080/api/v1/customer/${customerId}/purchaseTicket/${ticketCount}`);
  }
}
