import {CanActivateFn, Router} from '@angular/router';
import {User} from '../model/user';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localData = localStorage.getItem('ticketWave');
  if (localData != null) {
    const user: User = JSON.parse(localData);

    if (user.role === 'CUSTOMER') {
      if (state.url.includes('admin') || state.url.includes('vendor')) {
        router.navigateByUrl('home');
        return false;
      }
    } else if (user.role === 'VENDOR') {
      if (state.url.includes('event') || state.url.includes('admin')) {
        router.navigateByUrl('vendor');
        return false;
      }
    } else if (user.role === 'ADMIN') {
      if (state.url.includes('event') || state.url.includes('vendor')) {
        router.navigateByUrl('admin');
        return false;
      }
    }

    return true;
  } else {
    // Redirect to home if user is not logged in
    router.navigateByUrl('home');
    return false;
  }
};
