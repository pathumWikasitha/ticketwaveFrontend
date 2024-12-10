import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl: string = 'http://localhost:8080/api/v1/ticket/';

  constructor(private http: HttpClient) {
  }

  getPurchasedTickets(vendorId:number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl + `all/${vendorId}`);
  }
}
