import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Customer } from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ticketWave';

  userService = inject(UserService);
  registerObj: Customer = new Customer();

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

  openRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'block';
    }
  }
  openLogin() {
    const model = document.getElementById('logineModel');
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
    const model = document.getElementById('logineModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }
}
