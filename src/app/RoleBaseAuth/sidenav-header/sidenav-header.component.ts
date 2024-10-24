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
    this.selectedItem = this.dashborad;
    this.username = localStorage.getItem('user_name');
    if (this.username) {
      // this.firstName = this.getFirstName(this.username);
      this.firstName = this.capitalizeFirstLetter(this.username);
      // console.log(this.firstName);
      this.firstLetter = this.firstName.charAt(0).toUpperCase();
    }
    this.role = this.authService.getRole();

    // Get the current URL
    this.route.url.subscribe((urlSegments) => {
      this.currentUrl =  urlSegments[urlSegments.length - 1].path;
      // console.log('Current URL:', this.currentUrl);
    });

    console.log(this.dashborad);
    console.log(this.selectedItem)
     // Check if the screen size is mobile or not
     /*this.breakpointObserver.observe(['(max-width: 360px)']).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.isSidenavOpen = true; // Close sidenav for mobile by default
      }
    });*/
  }


  onDashboardClick() {
    // this.sectionSelected.emit('dashboard');
    this.selectedItem = 'dashboard';
  }

  onMocksClick() {
    // this.sectionSelected.emit('mocks');
    this.selectedItem = 'feedback';
  }

  onLeads() {
    // this.sectionSelected.emit('leads');
    this.selectedItem = 'leads';
  }

  onTotalFees(){
    this.selectedItem = 'totalFees';
  }

  // onUsers(){
  //   this.sectionSelected.emit('users');
  // }
  onClick(name:any){
    this.selectedItem = name;
    // console.log("current name:=>",name);
   }

  // getFirstName(fullName: string): string {
  //   const nameParts = fullName.split(' ');
  //   return nameParts[0]; 
  // }
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
