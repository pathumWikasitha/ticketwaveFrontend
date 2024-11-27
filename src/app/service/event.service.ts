import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get('http://localhost:8080/api/v1/event/all');
  }
  getEventById(id: number) {
    return this.http.get(`http://localhost:8080/api/v1/event/${id}`);
  }
}
