import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ScholarshipDataResponse } from '../models/scholrshipData/scholarship';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {
  private baseApiUrl = environment.ApiUrl;
  booleanSubject = new BehaviorSubject<boolean>(false);

 constructor(private http: HttpClient) { }

 saveScholarshipData(scholarshipData: any): Observable<any> {
  return this.http.post<any>(`${this.baseApiUrl}/scholarship`,scholarshipData);
}

getScholarshipData(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<ScholarshipDataResponse> { 
  const params: any = {
    page,
    limit,
    ...filters
  };
  return this.http.get<ScholarshipDataResponse>(`${this.baseApiUrl}/scholarship?search=${searchTerm}`,{ params });  
}

updateScholarshipData(Id: string, scholarshipInfo: any): Observable<any> {
  return this.http.put<any>(`${this.baseApiUrl}/scholarship/${Id}`, scholarshipInfo);
}

deleteScholarshipData(Id: string): Observable<any> {
  return this.http.delete<any>(`${this.baseApiUrl}/scholarship/${Id}`);
}

}
