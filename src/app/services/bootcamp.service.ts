import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { InterestedStudentResponse } from '../models/interestedStudents';

@Injectable({
  providedIn: 'root'
})
export class BootcampService {

  private baseApiUrl = environment.ApiUrl;
  booleanSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  //Bootcamp 
  getBootCamp(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<any> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp?search=${searchTerm}`, { params });
  }

  updateBootcampStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/bootcamp/${student._id}`, student);
  }

  deleteBootcampStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/bootcamp/${studentId}`);
  }

  //Get Total Records for Leads section
  getBootcampTotalRecords(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp/totalRecords`);
  }

  addBootcampFollowUp(followUpData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/bootcamp/followup`, followUpData);
  }

  getBootcampFollowUp(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<any> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp/followup?search=${searchTerm}`, { params });
  }

  updateBootcampFollowUpStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/bootcamp/followup/${student._id}`, student);
  }

  deleteBootcampFollowUpStudent(studentId: any): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/bootcamp/followup/${studentId}`);
  }

  //Interested
  addBootcampInterested(interestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/bootcamp/interested`, interestedData);
  }

  getBootcampInterested(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<InterestedStudentResponse> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp/interested?search=${searchTerm}`, { params });
  }

  updateBootcampInterestedStudent(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/bootcamp/interested/${id}`, data);
  }

  deleteBootcampInterestedStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/bootcamp/interested/${studentId}`);
  }

  //Not Interested
  addBootcampNotInterested(notInterestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/bootcamp/notInterested`, notInterestedData);
  }

  getBootcampNotInterested(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<any> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp/notInterested?search=${searchTerm}`, { params });
  }

  updateBootcampNotInterestedStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/bootcamp/notInterested/${student._id}`, student);
  }

  sendNotInterestedEmail(id: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/bootcamp/notInterested/${id}/send-email`, {});
  }

  deleteBootcampNotinterestedStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/bootcamp/notInterested/${studentId}`);
  }

  //Codemind Bootcamp
  getCodemindBootCamp(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<any> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp/codemindBootcamp?search=${searchTerm}`, { params });
  }

  updateCodemindBootcampStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/bootcamp/codemindBootcamp/${student.id}`, student);
  }

  deleteCodemindBootcampStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/bootcamp/codemindBootcamp/${studentId}`);
  }

  sendcodemindBootcampEmail(id: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/bootcamp/codemindBootcamp/${id}/send-email`, {});
  }

}
