import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/event';


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:8080/api/v1/vendor/';

  constructor(private http: HttpClient) {

  }


  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}createEvent`, event);
  }

  releaseTickets(vendorID: number, ticketCount: number, event: Event): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}${vendorID}/releaseTickets/${ticketCount}`, event, {
      observe: 'response', // Include the full HTTP response
    });
  }

}
