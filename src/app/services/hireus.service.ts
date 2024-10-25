import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { InquiryStudentResponse } from '../models/inquiryStudents';
import { HireUsResponse } from '../models/hireus';

@Injectable({
  providedIn: 'root'
})
export class HireusService {

  private baseApiUrl = environment.ApiUrl;
  booleanSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) { }

  getHireUs(page: number, limit: number, searchTerm: string = '',filters: any = {}): Observable< HireUsResponse> { 
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<HireUsResponse>(`${this.baseApiUrl}/hireus?search=${searchTerm}`,{ params });  
  }

}
