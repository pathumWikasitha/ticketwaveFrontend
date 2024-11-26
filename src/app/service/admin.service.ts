import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Configuration} from '../model/configuration';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/v1/admin';

  constructor(private http: HttpClient) { }
  // Get configuration
  getConfigurations(): Observable<Configuration> {
    return this.http.get<Configuration>(this.apiUrl+'/getConfiguration');
  }

  // Save a new configuration
  saveConfiguration(config: any): Observable<any> {
    return this.http.post(this.apiUrl+'/saveConfiguration', config,{ responseType: 'text'});
  }

  startSystem():Observable<string> {
    return this.http.post('http://localhost:8080/api/v1/admin/start', {}, { responseType: 'text' });
  }
  stopSystem(): Observable<string> {
    return this.http.post('http://localhost:8080/api/v1/admin/stop', {}, { responseType: 'text' });
  }

  //Update an existing configuration
  updateConfiguration(config: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, config);
  }

  // Delete a configuration
  deleteConfiguration(): Observable<any> {
    return this.http.delete(this.apiUrl+'/deleteConfiguration/');
  }

}
