import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class UserviceService {

  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any, categoryId: number) {
      
    return this.http.post(`${baseUrl}/user/`, user, { params: { categoryId: categoryId } });
  }
}
