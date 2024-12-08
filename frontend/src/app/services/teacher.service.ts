import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = `${baseUrl}/user/role`;

  constructor(private _http: HttpClient) { }

  getUsersByRole(roleName: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/${roleName}`);
  }


  getUserByUsername(username: string): Observable<any> {
    return this._http.get(`${baseUrl}/user/${username}`);
  }
  
  
   // Delete a user by ID
   deleteUser(userId: number){
    return this._http.delete(`${baseUrl}/user/${userId}`);
  }

  
}
