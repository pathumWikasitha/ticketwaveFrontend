import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvent() {
    return this.http.get('http://localhost:8080/api/v1/event/1');
  }
}
