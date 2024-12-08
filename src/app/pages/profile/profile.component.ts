import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Admin, Customer, User, Vendor} from '../../model/user';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  user: User = new User('');

  onSubmit(form: any) {
    if (form.valid) {
      if (this.user.role === 'ADMIN') {
        this.userService.updateAdmin(this.user).subscribe((result: Admin) => {
          if (result != null) {
            alert('Profile Updated successfully.');
            localStorage.removeItem('ticketWave')
            localStorage.setItem('ticketWave', JSON.stringify(result));
          } else {
            alert('Profile update failed.');
          }
        })
      }
      if (this.user.role === 'VENDOR') {
        this.userService.updateVendor(this.user).subscribe((result: Vendor) => {
          if (result != null) {
            alert('Profile Updated successfully.');
          } else {
            alert('Profile update failed.');
          }
        })
      }
      if (this.user.role === 'CUSTOMER') {
        this.userService.updateCustomer(this.user).subscribe((result: Customer) => {
          if (result != null) {
            alert('Profile Updated successfully.');
          } else {
            alert('Profile update failed.');
          }
        })
      }
    } else {
      alert('Invalid request');
    }
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('ticketWave')
    if (localData != null) {
      this.user = JSON.parse(localData);
    }
  }


}
