import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:8080/api/v1/vendor/';

  constructor(private http: HttpClient) { }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}createEvent`,event);
  }
}
