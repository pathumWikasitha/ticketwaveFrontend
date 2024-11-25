import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Customer } from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgOptimizedImage, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ticketWave';
  router = inject(Router);
  userService = inject(UserService);

  registerObj: Customer = new Customer();
  loginObj: Customer = new Customer();

  loggedUser: Customer = new Customer();

  constructor() {
    const localData = localStorage.getItem('ticketWave');
    if (localData != null) {
      this.loggedUser = JSON.parse(localData);
    }
  }

  onRegister() {
    this.userService.createNewUser(this.registerObj).subscribe((res: any) => {
      if (res == true) {
        alert('User Created Success');
      } else {
        alert('Register Failed');
      }
    });
    this.closeRegister();
  }

  onLogin() {
    this.userService.loginUser(this.loginObj).subscribe({
      next: (response) => {
        if (response.status === 200) {
          localStorage.setItem('ticketWave', JSON.stringify(response.body));
          this.loggedUser = response.body;
          this.closeLogin();
          alert('Login Success');
        }
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Invalid email and password');
        } else {
          alert(`Login failed. Error code: ${error.status}`);
        }
      },
    });
  }

  onLogout() {
    this.loggedUser = new Customer();
    localStorage.removeItem('ticketWave');
    this.refreshPage()
  }

  openRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  openLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }
  closeLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  refreshPage(): void {
    window.location.reload();
  }
}
