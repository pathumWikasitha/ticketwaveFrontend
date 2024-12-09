import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Ticket} from '../model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl: string = 'http://localhost:8080/api/v1/ticket/';

  constructor(private http: HttpClient) {
  }

  getNewTicketDetails(): Observable<Ticket> {
    return this.http.get<Ticket>(this.apiUrl + 'all');
  }
}
