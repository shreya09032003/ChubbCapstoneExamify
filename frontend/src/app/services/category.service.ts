import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
interface Category {
  cid: number;
  title: string | null;
  description: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http: HttpClient) {}
  //load all the cateogries
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  categories2(): Observable<Category[]> {
    return this._http.get<Category[]>(`${baseUrl}/category/`);
  }

  //add new category
  public addCategory(category: any) {
    return this._http.post(`${baseUrl}/category/`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this._http.delete<any>(`${baseUrl}/category/${categoryId}`);
  }

  getCategoryId(cid: any) {
    return this._http.get(`${baseUrl}/category/${cid}`);
  }
}
