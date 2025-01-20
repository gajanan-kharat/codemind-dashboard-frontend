import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HireUsResponse } from '../models/hireFromUs/hireus';
import { HireUsInterestedResponse } from '../models/hireFromUs/interested';
import { HireUsFollowUpResponse } from '../models/hireFromUs/followUp';

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
 
  //add New HireUs
  addHireUs(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/hireus`,studentData);
  }


  //delete HireUs
  deleteHireUs(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/hireus/${studentId}`);
  }

  /******** HireUs Interested ********/
  //add HireUs Interested
  addHireUsInterested(interestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/hireus/interested`, interestedData);
  }

  //get HireUs Interested
  getHireUsInterested(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<HireUsInterestedResponse> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/hireus/interested?search=${searchTerm}`,{ params });
  }

  //update HireUs Interested
  updateHireUsInterested(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/hireus/interested/${id}`, data);
  }

  //delete HireUs Interested
  deleteHireUsInterested(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/hireus/interested/${studentId}`);
  }

  /******** HireUs Not Interested ********/

  //add HireUs Not Interested
  addHireUsNotInterested(notinterestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/hireus/notInterested`, notinterestedData);
  }

  //get HireUs Interested
  getHireUsNotInterested(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<HireUsInterestedResponse> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/hireus/notInterested?search=${searchTerm}`,{ params });
  }

  //update HireUs Interested
  updateHireUsNotInterested(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/hireus/notInterested/${id}`, data);
  }

  //delete HireUs Interested
  deleteHireUsNotInterested(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/hireus/notInterested/${studentId}`);
  }

  /********* HireUs FollowUp *******/
  //add HireUs FollowUp
  addHireUsFollowUp(notinterestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/hireus/followUp`, notinterestedData);
  }

  //get HireUs FollowUp
  getHireUsFollowUp(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<HireUsFollowUpResponse> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/hireus/followUp?search=${searchTerm}`,{ params });
  }

  //Update HireUs Followup
  updateHireUsFollowUp(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/hireus/followUp/${student._id}`, student);
  }


  //delete HireUs FollowUp
  deleteHireUsFollowUp(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/hireus/followUp/${studentId}`);
  }

  //Get total records of HireUs Section
  getHireUsTotalRecords(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/hireus/totalRecords`);
  }

}
