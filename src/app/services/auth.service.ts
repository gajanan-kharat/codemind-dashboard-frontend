import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { UsersResponse } from '../models/adminUsers';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiryPopupComponent } from '../RoleBaseAuth/session-expiry-popup/session-expiry-popup.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.ApiUrl}/auth`;
  private roleKey = "user_role";
  private userKey = "user_name";
  private tokenKey = "auth_token";
  private fullName = "user_fullName";
  private id = "id";
  private tokenExpirationTimer: Subscription | null = null;

  constructor(private http: HttpClient,
              private router: Router, 
              private cookieService: CookieService,
              private dialog: MatDialog) {
   }

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  /*setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }*/

  setToken(token: string) {
    const expirationInHours = 12; 
    const expirationInSeconds = expirationInHours * 60 * 60; 
    const expirationInDays = expirationInSeconds / 86400; 
    this.cookieService.set(this.tokenKey, token, expirationInDays, '/');
    this.startLogoutTimer(expirationInSeconds);
  }
  
  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
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
  
  setFullname(fullname: string) {
    localStorage.setItem(this.fullName , fullname);
  }

  getFullname(): string | null {
    return localStorage.getItem(this.fullName);
  }
  setId(id: string) {
    localStorage.setItem(this.id , id);
  }

  getId(): string |null{
    return localStorage.getItem(this.id);
  }

  logout() {
    // localStorage.removeItem(this.tokenKey);
    // localStorage.removeItem(this.roleKey);
    // localStorage.removeItem(this.userKey);
    // localStorage.removeItem(this.fullName);
    // localStorage.removeItem(this.id);
    this.cookieService.delete(this.tokenKey, '/');
    localStorage.clear();
    this.router.navigate(['/']);
    console.log('User has been logged out due to token expiration.');

    // Clear the timer to avoid potential memory leaks
    if (this.tokenExpirationTimer) {
      this.tokenExpirationTimer.unsubscribe();
      this.tokenExpirationTimer = null;
    }
  }

  private startLogoutTimer(expirationInSeconds: number) {
    // Clear any existing timer
    if (this.tokenExpirationTimer) {
      this.tokenExpirationTimer.unsubscribe();
    }

    // Start a new timer for the given expiration time
    this.tokenExpirationTimer = timer(expirationInSeconds * 1000).subscribe(() => {
      this.openSessionExpiryPopup();
      // this.logout(); // Automatically log out when the timer emits
    });
  }
  
  private openSessionExpiryPopup() {
    // Open a modal or popup dialog to inform the user about session expiration
    const dialogRef = this.dialog.open(SessionExpiryPopupComponent);

    // Optional: Handle actions when the popup is closed
    dialogRef.afterClosed().subscribe(() => {
      // Additional logic if needed after the user closes the popup
    });
  }

  getUser(page: number, limit: number, searchTerm: string = '', filters: any = {}): Observable<UsersResponse> {
    const params: any = {
      page,
      limit,
      ...filters
    };
    return this.http.get<UsersResponse>(`${this.apiUrl}/users?search=${searchTerm}`,{ params });
  }

  deleteUsers(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteusers/${studentId}`);
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
