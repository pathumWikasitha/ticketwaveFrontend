import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../service/admin.service';
import {NgClass} from '@angular/common';
import {Configuration} from '../../model/configuration';
import {System} from '../../model/System';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
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
      if (res != null) {
        alert('Configuration saved!');
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

    this.configService.updateConfiguration(this.configForm.value).subscribe((res: Configuration) => {
      if (res != null) {
        alert('Configuration updated!');
      } else {
        alert('Configuration update failed!');
      }
    });
  }

  // Load configuration from the server
  loadConfiguration(): void {
    this.configService.getConfigurations().subscribe((res: any) => {
      if (res != null) {
        this.configForm.patchValue(res); // Populate the form with the configuration
        this.isConfigLoaded = true;
        alert('Configuration loaded successfully!');
      } else {
        alert('Configuration not found!');
      }
    });
  }

  // Delete configuration from the server
  deleteConfiguration(): void {
    if (this.isConfigLoaded) {
      this.configService.deleteConfiguration().subscribe({
        next: (response: string) => {
          if (response.includes("Configuration deleted successfully")) {
            alert("Configuration deleted successfully")
          } else {
            alert('Configuration deleted failed!');
          }
        },
        error: (err) => {
          alert(err)
        }
      });
    }
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
          alert('Failed to start the system.' + err);
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
          alert('System Stopped!');
        } else {
          alert('Unexpected response: ' + response);
        }
      },
      error: (err) => {
        alert("Failed to stop the system." + err);
      }
    });
  }

  ngOnInit(): void {
    this.configService.getSystemStatus().subscribe((res: System) => {
      if (res.running) {
        this.configService.getConfigurations().subscribe((res: Configuration) => {
          if (res != null) {
            this.configForm.patchValue(res); // Populate the form with the configuration
            this.isConfigLoaded = true;
            this.configService.getSystemStatus().subscribe((res: System) => {
              if (res.running) {
                this.systemRunning = true;
              }
            })
          } else {
            this.systemRunning = false;
          }
        });
      }
    })
  }

}
