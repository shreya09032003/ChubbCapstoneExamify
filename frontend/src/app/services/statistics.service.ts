import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {


  constructor(private http: HttpClient) {}

  getTotalMarks(categoryId: number): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistics/total-marks/${categoryId}`);
  }

  getTotalAttempts(categoryId: number): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistics/total-attempts/${categoryId}`);
  }

  getAverageScore(categoryId: number): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistics/average-score/${categoryId}`);
  }

  getTotalCorrectAnswers(categoryId: number): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistics/total-correct-answers/${categoryId}`);
  }

  getTotalQuestionsAttempted(categoryId: number): Observable<number> {
    return this.http.get<number>(`${baseUrl}/statistics/total-questions-attempted/${categoryId}`);
  }
}
