import { Component, inject } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Customer, User} from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgOptimizedImage, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ticketWave';
  router = inject(Router);
  userService = inject(UserService);

  registerObj: Customer = new Customer();
  loginObj: User = new User('');

  loggedUser: User = new User('');

  constructor() {
    const localData = localStorage.getItem('ticketWave');
    if (localData != null) {
      this.loggedUser = JSON.parse(localData);
    }
  }

  onRegister(registerForm: NgForm) {
    if (this.registerValidated()){
      this.userService.createNewUser(this.registerObj).subscribe((res: any) => {
        if (res == true) {
          alert('Register successfully!');
        } else {
          alert('Register Failed');
        }
      });
      this.closeRegister();
      registerForm.resetForm();
    }else {
      alert('Please fill all fields correctly.');
    }

  }
  registerValidated():boolean {
    return this.registerObj.username.trim().length >= 3 && this.registerObj.password.trim().length >= 8 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registerObj.email);
  }


  onLogin(loginForm: NgForm) {
    this.userService.loginUser(this.loginObj).subscribe({
      next: (response) => {
        if (response.status === 200) {
          debugger;
          localStorage.setItem('ticketWave', JSON.stringify(response.body));
          this.loggedUser = response.body;
          this.closeLogin();
          alert('Login Success');
          loginForm.resetForm();
          if (this.loggedUser.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          }
          if (this.loggedUser.role === 'Vendor') {
            this.router.navigate(['/vendor']);
          }
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
    this.loggedUser = new User('');
    this.router.navigate(['/home']).then(r => localStorage.removeItem('ticketWave'));
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

}
