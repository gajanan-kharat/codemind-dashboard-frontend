import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
   booleanSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  saveStudent(studentData: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseApiUrl}/students`,studentData);
  }

  getStudent(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<StudentInformationResponse> { 
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<StudentInformationResponse>(`${this.baseApiUrl}/studentInformation?search=${searchTerm}`,{ params });  
  }

  updateStudent(studentinfo: any): Observable<StudentInformation> {
    return this.http.put<StudentInformation>(`${this.baseApiUrl}/studentInformation/${studentinfo._id}`, studentinfo);
  }

  updateStudentPayment(paymentinfo: any): Observable<StudentInformation> {
    return this.http.put<StudentInformation>(`${this.baseApiUrl}/studentInformation/payments/${paymentinfo._id}`, paymentinfo);
  }
 
  saveNewStudent(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/studentInformation`, studentData);
  }

  deleteStudentInformation(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/studentInformation/${studentId}`);
  }

  //Interested Student
  saveConfirmedStudent(confirmedstudentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/studentInformation`, confirmedstudentData);
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
  
  getStudentMock(page: number, limit: number, searchTerm: string = '',filters: any = {}): Observable<StudentMockResponse> { 
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<StudentMockResponse>(`${this.baseApiUrl}/studentMockInformation?search=${searchTerm}`,{ params });  
  }

  updateStudentMock(studentmockinfo: any): Observable<StudentMockInfo> {
    return this.http.put<StudentMockInfo>(`${this.baseApiUrl}/studentMockInformation/${studentmockinfo._id}`, studentmockinfo);
  }

  deleteStudentMock(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/studentMockInformation/${studentId}`);
  }

  getInquiryStudent(page: number, limit: number, searchTerm: string = '',filters: any = {}): Observable<InquiryStudentResponse> { 
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<InquiryStudentResponse>(`${this.baseApiUrl}/students?search=${searchTerm}`,{ params });  
  }

  addInquiry(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/students`,studentData);
  }

  // updateInquiry(inquiry: any): Observable<any> {
  //   return this.http.put(`${this.baseApiUrl}/students/${inquiry._id}`, inquiry);
  // }

  addFollowUp(followUpData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/followup`, followUpData);
  }

  getFollowUp(page: number, limit: number, searchTerm: string = '',filters:any={}): Observable<any> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/followup?search=${searchTerm}`,{ params });
  }
  
  updateFollowUpStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/followup/${student._id}`, student);
  }

  deleteFollowUpStudent(student: any): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/followup/${student._id}`, student);
  }

  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/students/${studentId}`);
  }
 
  //Interested
  addInterested(interestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/interested`, interestedData);
  }

  getInterested(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<InterestedStudentResponse> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/interested?search=${searchTerm}`,{ params });
  }

  updateInterestedStudent(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/interested/${id}`, data);
  }

  deleteInterestedStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/interested/${studentId}`);
  }

  //Not Interested
  addNotInterested(notInterestedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/notInterested`, notInterestedData);
  }

  getNotInterested(page: number, limit: number, searchTerm: string = '',filters: any = {}): Observable<any> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/notInterested?search=${searchTerm}`,{ params });
  }

  updateNotInterestedStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/notInterested/${student._id}`, student);
  }
  
  sendNotInterestedEmail(id: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/notInterested/${id}/send-email`, {});
  }

  deleteNotinterestedStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/notInterested/${studentId}`);
  }
  
  //Bootcamp 
  getBootCamp(page: number, limit: number, searchTerm: string = '',filters: any = {}): Observable<BootcampStudentResponse> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/bootcamp?search=${searchTerm}`,{ params });
  }

  updateBootcampStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/bootcamp/${student._id}`,student);
  }

  deleteBootcampStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/bootcamp/${studentId}`);
  }

  //Get Total Records for Leads section
  getTotalRecords(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/total-records`);
  }


  //get fees data
  getStudentFees(filters: any = {}): Observable<any> { 
    const params: any = {
      ...filters
    };
    return this.http.get<any>(`${this.baseApiUrl}/studentInformation/fees-summary`,{ params });  
  }


}
 