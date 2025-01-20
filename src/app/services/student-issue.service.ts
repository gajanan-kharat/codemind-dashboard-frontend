import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentIssueService {

  private baseApiUrl = environment.ApiUrl;
  booleanSubject = new BehaviorSubject<boolean>(false);

 constructor(private http: HttpClient) { }

saveStudentIssuesData(studentIssuesData: any): Observable<any> {
  return this.http.post<any>(`${this.baseApiUrl}/studentIssues`,studentIssuesData);
}

getStudentIssuesData(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<any> { 
  const params: any = {
    page,
    limit,
    ...filters
  };
  return this.http.get<any>(`${this.baseApiUrl}/studentIssues?search=${searchTerm}`,{ params });  
}

updateStudentIssuesData(Id: string, studentIssuesData: any): Observable<any> {
  return this.http.put<any>(`${this.baseApiUrl}/studentIssues/${Id}`, studentIssuesData);
}

deleteStudentIssuesData(Id: string): Observable<any> {
  return this.http.delete<any>(`${this.baseApiUrl}/studentIssues/${Id}`);
}

}
