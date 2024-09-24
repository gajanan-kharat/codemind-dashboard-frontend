import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNavbarCollapsed = true;
  isNavbarOpen=false;
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  
  constructor(private router: Router) { }

  navigateToSignUp() {
    this.router.navigate(['/login']); 
  }
  closeNavbar() {
    this.isNavbarCollapsed = true; // Close the menu
  }
}
