import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Event} from '../../model/event';
import {VendorService} from '../../service/vendor.service';

@Component({
  selector: 'app-vendor',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './vendor.component.html',
  standalone: true,
  styleUrl: './vendor.component.css'
})
export class VendorComponent {
  vendorService = inject(VendorService);
  eventObj: Event = new Event();
  eventForm!: NgForm;


  isModalOpen: boolean = false;

  onOpenAddEvent(): void {
    this.isModalOpen = true;
  }

  closeEventModal(): void {
    this.isModalOpen = false;
    if (this.eventForm) {
      this.eventForm.reset(); // Reset the form
    }
  }

  onAddEvent(eventForm: NgForm): void {
    this.eventForm = eventForm;
    if (this.eventForm.valid) {
      this.eventObj.eventDateTime = this.formatDateTime(this.eventObj.eventDateTime) // make date meaningful
      this.vendorService.createEvent(this.eventObj).subscribe((res: any) => {
        if (res != null) {
          alert('Event Created Successfully');
        } else {
          alert('Event create failed');
        }
      })
      eventForm.reset(); // Reset form after submission
      this.closeEventModal(); // Close modal
    } else {
      alert('Please fill in all required fields.');
    }
  }

  formatDateTime(original: string): string {
    // Parse the input string into a Date object
    const date = new Date(original);

    // Format the date (Month day, Year)
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Format the time (HH:MM AM/PM)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${(hours % 12 || 12)}.${minutes < 10 ? '0' + minutes : minutes} ${period}`;

    // Combine date and time into the final format
    return `${formattedDate} • ${formattedTime} IST`;
  }


}
