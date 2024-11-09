import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss']
})
export class SidenavHeaderComponent {
  // @Output() sectionSelected = new EventEmitter<string>();
  @Input() dashborad! :string;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger | undefined;
  // isSidenavOpen = false; 
  username: string | null = '';
  firstLetter: string | null = '';
  firstName: string | null = '';
  role: string | null ='';
  selectedItem: string | null = '';
  currentUrl: string = '';


  constructor(private authService: AuthService,
              private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute, 
              private router: Router ) {}
  ngOnInit(): void {
    // this.selectedItem = this.dashborad;
    this.username = localStorage.getItem('user_name');
    if (this.username) {
      this.firstName = this.capitalizeFirstLetter(this.username);
      this.firstLetter = this.firstName.charAt(0).toUpperCase();
    }
    this.role = this.authService.getRole();

    // Get the current URL
    this.route.url.subscribe((urlSegments) => {
      this.currentUrl =  urlSegments[urlSegments.length - 1].path;
    });

  }

  onClick(name:any){
    this.selectedItem = name;
   }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  
  isSidenavOpen = true;
  isSidenavCollapsed = false;
  isMobile = false;
  toggleSidenav(): void {
    if (this.isMobile) {
      this.isSidenavOpen = !this.isSidenavOpen;
    } else {
      this.isSidenavCollapsed = !this.isSidenavCollapsed;
    }
  }


  logout() {
    this.authService.logout();
    console.log('Logged out');
  }

  
}
