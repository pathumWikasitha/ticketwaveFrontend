import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  eventService = inject(EventService);
  events: any[] = [];

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvent().subscribe((res: any) => {
      debugger;
      this.events = res;
    });
  }
}
