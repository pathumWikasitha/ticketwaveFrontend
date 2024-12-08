import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Admin, Customer, User, Vendor} from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient) {
  }

  createNewCustomer(obj: Customer) {
    return this.http.post(
      `${this.url}customer/register`,
      obj
    );
  }
  createNewVendor(obj: Vendor) {
    return this.http.post(
      `${this.url}vendor/register`,
      obj
    );
  }
  updateVendor(obj: Vendor): Observable<User> {
    return this.http.put<User>(`${this.url}vendor/update`, obj);
  }
  updateAdmin(obj: Admin) {
    return this.http.put<Admin>(`${this.url}admin/update`, obj);
  }
  updateCustomer(obj: Customer) {
    return this.http.put<Customer>(`${this.url}customer/update`, obj);
  }

  loginUser(obj: Customer): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}user/login`, obj, {
      observe: 'response', // Include the full HTTP response
    });
  }
}
