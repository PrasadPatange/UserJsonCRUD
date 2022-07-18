import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  url = environment.apiURL;

  constructor(private http: HttpClient) {}

  // Get Data From Database
  getData(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Add Data to the database
  addData(data: User): Observable<User[]> {
    return this.http.post<User[]>(this.url, data);
  }

  // Get User Id
  getDataById(id: number) {
    return this.http.get<User[]>(`${this.url}/${id}`);
  }

  // Update User Data
  updateData(data: User) {
    return this.http.put<User>(`${this.url}/${data.id}`, data);
  }

  // Delete User Data
  deleteData(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
