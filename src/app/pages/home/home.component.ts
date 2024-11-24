import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Customer } from '../../model/user';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  eventService = inject(EventService);
  events: any[] = [];
  appComponent = inject(AppComponent);

  loggedUser = new Customer();

  ngOnInit(): void {
    this.getEvents();
  }
  constructor() {
    const localData = localStorage.getItem('ticketWave');
    if (localData != null) {
      this.loggedUser = JSON.parse(localData);
    }
  }

  getEvents() {
    this.eventService.getEvent().subscribe((res: any) => {
      this.events = res;
    });
  }
}
