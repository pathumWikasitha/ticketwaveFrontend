import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../service/admin.service';
import {NgClass} from '@angular/common';
import {Configuration} from '../../model/configuration';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit{
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
    debugger;
    if (this.configForm.invalid) {
      alert('All fields are required and must be greater than 0.');
      return;
    }
    this.configService.saveConfiguration(this.configForm.value).subscribe((res) => {
      if (res != null){
        alert('Configuration saved successfully!');
        this.isConfigLoaded = true;
      }
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
    this.configService.getConfigurations().subscribe((res:Configuration) => {
      if (res != null) {
        localStorage.setItem('configuration', JSON.stringify(res));
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
          if (response.includes('System started')) {
            this.systemRunning = true;
            alert('System Started!');
          } else {
            alert('Unexpected response: ' + response);
          }
        },
        error: (err) => {
          alert('Failed to start the system.' +err);
        }
      });
    } else {
      alert('Please load or save a configuration first.');
    }
  }

  // Stop the system
  stopSystem(): void {
    this.configService.stopSystem().subscribe({
      next: (response: string) => {
        if (response.includes('System stopped')) {
          this.systemRunning = false;
          this.isConfigLoaded = false;
          this.configForm.reset();
          localStorage.removeItem('configuration');
          alert('System Stopped!');
        }else {
          alert('Unexpected response: ' + response);
        }
      },
      error: (err) => {
        alert("Failed to stop the system." +err);
      }
    });
  }

  ngOnInit(): void {
    const storedConfig = localStorage.getItem('configuration');
    if (storedConfig) {
      const config: Configuration = JSON.parse(storedConfig);
      this.configForm.patchValue(config);
      this.isConfigLoaded = true;
    }
  }

}
