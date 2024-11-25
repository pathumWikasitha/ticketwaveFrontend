import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../service/admin.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.css',
})
export class AdminComponent{
  configForm: FormGroup; // Reactive Form
  systemRunning = false; // For controlling the "Start System" button
  isConfigLoaded = false; // Enables "Start System" only after loading a configuration

  private fb = inject(FormBuilder); // Inject FormBuilder
  private configService = inject(AdminService); // Inject service

  constructor() {
    // Initialize form with validators
    this.configForm = this.fb.group({
      totalTickets: [0, [Validators.required, Validators.min(1)]],
      maxTicketCapacity: [0, [Validators.required, Validators.min(1)]],
      customerRetrievalRate: [0, [Validators.required, Validators.min(1)]],
      ticketReleaseRate: [0, [Validators.required, Validators.min(1)]],
    });
  }

  // Save configuration
  saveConfiguration(): void {
    if (this.configForm.invalid) {
      alert('All fields are required and must be greater than 0.');
      return;
    }
    this.configService.saveConfiguration(this.configForm.value).subscribe(() => {
      alert('Configuration saved successfully!');
      this.isConfigLoaded = true;
    });
  }

  // Update configuration
  updateConfiguration(): void {
    if (this.configForm.invalid) {
      alert('All fields are required and must be greater than 0.');
      return;
    }
    this.configService.updateConfiguration(this.configForm.value).subscribe(() => {
      alert('Configuration updated successfully!');
    });
  }

  // Load configuration from the server
  loadConfiguration(): void {
    this.configService.getConfigurations().subscribe((res) => {
      if (res) {
        this.configForm.patchValue(res); // Populate the form with the configuration
        this.isConfigLoaded = true;
        alert('Configuration loaded successfully!');
      } else {
        alert('Failed to load configuration.');
      }
    });
  }

  // Start the system
  startSystem(): void {
    if (this.isConfigLoaded) {
      this.configService.startSystem().subscribe({
        next: (response: string) => {
          console.log(response); // Should log: "System started..."
          if (response.includes('System started')) {
            this.systemRunning = true;
            alert('System Started!');
          } else {
            alert('Unexpected response: ' + response);
          }
        },
        error: (err) => {
          console.error('Error starting system:', err);
          alert('Failed to start the system.');
        }
      });
    } else {
      alert('Please load or save a configuration first.');
    }
  }

  // Stop the system
  stopSystem(): void {
    this.systemRunning = false;
    alert('System Stopped!');
  }
}
