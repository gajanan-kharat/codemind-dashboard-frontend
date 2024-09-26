import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StudentInformation } from '../models/studentInformation';
import { StudentMockInfo } from '../models/studentMockInformation';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private baseApiUrl = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  saveStudent(studentData: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseApiUrl}/students`,studentData);
  }

  getStudent(): Observable<StudentInformation[]> { 
    return this.http.get<StudentInformation[]>(`${this.baseApiUrl}/studentInformation`);  
  }

  updateStudent(studentinfo: any): Observable<StudentInformation> {
    return this.http.put<StudentInformation>(`${this.baseApiUrl}/studentInformation/${studentinfo._id}`, studentinfo);
  }

  generateReport(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/generate-report`, studentData);
  }

  generateUsersReport(usersData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/generate-usersReport`, { usersData }, {
      responseType: 'blob' as 'json'
    });
  }
  
  generateStudentsReport(studentsData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/generate-studentsReport`, { studentsData }, {
      responseType: 'blob' as 'json'
    });
  }
  
  getStudentMock(): Observable<StudentMockInfo[]> { 
    return this.http.get<StudentMockInfo[]>(`${this.baseApiUrl}/studentMockInformation`);  
  }

  updateStudentMock(studentmockinfo: any): Observable<StudentMockInfo> {
    return this.http.put<StudentMockInfo>(`${this.baseApiUrl}/studentMockInformation/${studentmockinfo._id}`, studentmockinfo);
  }

  getInquiryStudent(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.baseApiUrl}/students`);  
  }

  // updateInquiry(inquiry: any): Observable<any> {
  //   return this.http.put(`${this.baseApiUrl}/students/${inquiry._id}`, inquiry);
  // }

  addFollowUp(followUpData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/followup`, followUpData);
  }

  getFollowUp(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/followup`);
  }
  updateFollowUpStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/followup/${student._id}`, student);
  }
  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/students/${studentId}`);
  }
   
  //Bootcamp 
  getBootCamp(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp`);
  }
  updateBootcampStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/bootcamp/${student._id}`,student);
  }


}
 