import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.ApiUrl}/auth`;
  private roleKey = "user_role";
  private userKey = "user_name";
  private tokenKey = "auth_token";
  private id = "id";

  constructor(private http: HttpClient,private router: Router) { }

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setRole(role: string) {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }
  
  setUsername(role: string) {
    localStorage.setItem(this.userKey , role);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.userKey);
  }

  setId(id: string) {
    localStorage.setItem(this.id , id);
  }

  getId(): string |null{
    return localStorage.getItem(this.id);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.id);
    this.router.navigate(['/']);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  updateUserManagement(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usersmanagement/${id}`, updatedData);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateUser(id: string, userData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }
}
