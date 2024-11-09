import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CollegeDataResponse } from '../models/collegeData/collegeInfo';

@Injectable({
  providedIn: 'root'
})
export class CollegeDataService {
  private baseApiUrl = environment.ApiUrl;
  booleanSubject = new BehaviorSubject<boolean>(false);

 constructor(private http: HttpClient) { }

 saveCollegeData(collegeData: any): Observable<any> {
  return this.http.post<any>(`${this.baseApiUrl}/collegeData`,collegeData);
}

getCollegeData(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<CollegeDataResponse> { 
  const params: any = {
    page,
    limit,
    ...filters
  };
  return this.http.get<CollegeDataResponse>(`${this.baseApiUrl}/collegeData?search=${searchTerm}`,{ params });  
}

updateCollgeData(Id: string, Collegeinfo: any): Observable<any> {
  return this.http.put<any>(`${this.baseApiUrl}/collegeData/${Id}`, Collegeinfo);
}

deleteCollgeData(Id: string): Observable<any> {
  return this.http.delete<any>(`${this.baseApiUrl}/collegeData/${Id}`);
}


}
