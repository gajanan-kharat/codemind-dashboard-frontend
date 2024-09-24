import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss']
})
export class SidenavHeaderComponent {
  @Output() sectionSelected = new EventEmitter<string>();
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger | undefined;
  isSidenavOpen = false; 
  username: string | null = '';
  firstLetter: string | null = '';
  firstName: string | null = '';
  role: string | null ='';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.username = localStorage.getItem('user_name');
    if (this.username) {
      // this.firstName = this.getFirstName(this.username);
      this.firstName = this.capitalizeFirstLetter(this.username);
      console.log(this.firstName);
      this.firstLetter = this.firstName.charAt(0).toUpperCase();
    }
    this.role = this.authService.getRole();
  }


  onDashboardClick() {
    this.sectionSelected.emit('dashboard');
  }

  onMocksClick() {
    this.sectionSelected.emit('mocks');
  }

  onLeads() {
    this.sectionSelected.emit('leds');
  }

  onUsers(){
    this.sectionSelected.emit('users');
  }

  // getFirstName(fullName: string): string {
  //   const nameParts = fullName.split(' ');
  //   return nameParts[0]; 
  // }
  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  

  logout() {
    this.authService.logout();
    console.log('Logged out');
  }
}
