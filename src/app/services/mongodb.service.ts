import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StudentInformation, StudentInformationResponse } from '../models/studentInformation';
import { StudentMockInfo, StudentMockResponse } from '../models/studentMockInformation';
import { Contact } from '../models/contact';
import { BootcampStudentResponse } from '../models/bootcampStudents';
import { InquiryStudentResponse } from '../models/inquiryStudents';
import { InterestedStudentResponse } from '../models/interestedStudents';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private baseApiUrl = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  saveStudent(studentData: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseApiUrl}/students`,studentData);
  }

  getStudent(page: number, limit: number, searchTerm: string = ''): Observable<StudentInformationResponse> { 
    const params: any = {
      page,
      limit,
    };
    return this.http.get<StudentInformationResponse>(`${this.baseApiUrl}/studentInformation?search=${searchTerm}`,{ params });  
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
  
  getStudentMock(page: number, limit: number, searchTerm: string = ''): Observable<StudentMockResponse> { 
    const params: any = {
      page,
      limit,
    };
    return this.http.get<StudentMockResponse>(`${this.baseApiUrl}/studentMockInformation?search=${searchTerm}`,{ params });  
  }

  updateStudentMock(studentmockinfo: any): Observable<StudentMockInfo> {
    return this.http.put<StudentMockInfo>(`${this.baseApiUrl}/studentMockInformation/${studentmockinfo._id}`, studentmockinfo);
  }

  getInquiryStudent(page: number, limit: number, searchTerm: string = ''): Observable<InquiryStudentResponse> { 
    const params: any = {
      page,
      limit,
    };
    return this.http.get<InquiryStudentResponse>(`${this.baseApiUrl}/students?search=${searchTerm}`,{ params });  
  }

  // updateInquiry(inquiry: any): Observable<any> {
  //   return this.http.put(`${this.baseApiUrl}/students/${inquiry._id}`, inquiry);
  // }

  addFollowUp(followUpData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/followup`, followUpData);
  }

  getFollowUp(page: number, limit: number, searchTerm: string = ''): Observable<any> {
    const params: any = {
      page,
      limit,
    };
    return this.http.get<any>(`${this.baseApiUrl}/followup?search=${searchTerm}`,{ params });
  }
  updateFollowUpStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/followup/${student._id}`, student);
  }
  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/students/${studentId}`);
  }
  //Interested

  addInterested(interestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/interested`, interestedData);
  }

  getInterested(page: number, limit: number, searchTerm: string = ''): Observable<InterestedStudentResponse> {
    const params: any = {
      page,
      limit,
    };
    return this.http.get<any>(`${this.baseApiUrl}/interested?search=${searchTerm}`,{ params });
  }

  updateInterestedStudent(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/interested/${id}`, data);
  }
  //Not Interested
  addNotInterested(notInterestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/notInterested`, notInterestedData);
  }

  getNotInterested(page: number, limit: number, searchTerm: string = ''): Observable<any> {
    const params: any = {
      page,
      limit,
    };
    return this.http.get<any>(`${this.baseApiUrl}/notInterested?search=${searchTerm}`,{ params });
  }

  updateNotInterestedStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/notInterested/${student._id}`, student);
  }
  
  sendNotInterestedEmail(id: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/notInterested/${id}/send-email`, {});
  }
  
  //Bootcamp 
  getBootCamp(page: number, limit: number, searchTerm: string = ''): Observable<BootcampStudentResponse> {
    const params: any = {
      page,
      limit,
    };
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp?search=${searchTerm}`,{ params });
  }
  updateBootcampStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/bootcamp/${student._id}`,student);
  }

  //Get Total Records for Leads section
  getTotalRecords(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/total-records`);
  }


}
 