import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar = true;
  showFooter = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: 'ease-out',
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLayout(this.router.url);
      }
    });
    
  }

  private updateLayout(url: string): void {
  
    const hideLayoutRoutes = [
      '/contact',
      '/admin-dashboard',
      '/login',
      '/signup',
      '/student-dashboard',
      '/counselor'
    ];

    this.showNavbar = !hideLayoutRoutes.includes(url);
    this.showFooter = !hideLayoutRoutes.includes(url);
  }
}
