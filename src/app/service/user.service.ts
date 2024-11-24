import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createNewUser(obj: Customer) {
    return this.http.post(
      'http://localhost:8080/api/v1/customer/register',
      obj
    );
  }
}
