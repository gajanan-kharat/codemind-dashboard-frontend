import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseApiUrl = environment.ApiUrl;
  booleanSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  saveInventoryData(inventoryData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/inventory`,inventoryData);
  }

  getInventoryData(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<any> { 
      const params: any = {
        page,
        limit,
        ...filters
      };
    return this.http.get<any>(`${this.baseApiUrl}/inventory?search=${searchTerm}`,{ params });  
  }

  updateInventoryData(Id: string, inventoryData: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/inventory/${Id}`, inventoryData);
  }

  deleteInventoryData(Id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/inventory/${Id}`);
  }

}
