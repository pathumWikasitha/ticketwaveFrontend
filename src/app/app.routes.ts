import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import {VendorComponent} from './pages/vendor/vendor.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {BookingsComponent} from './pages/bookings/bookings.component';
import {authGuard} from './gard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[authGuard]
  },
  {
    path: 'event/:id',
    component: EventComponent,
    canActivate:[authGuard]
  },
  {
    path: 'vendor',
    component: VendorComponent,
    canActivate:[authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[authGuard]
  },
  {
    path: 'bookings',
    component: BookingsComponent,
    canActivate:[authGuard]

  }
];
