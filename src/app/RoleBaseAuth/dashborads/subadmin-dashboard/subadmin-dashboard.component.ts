import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-subadmin-dashboard',
  templateUrl: './subadmin-dashboard.component.html',
  styleUrls: ['./subadmin-dashboard.component.scss']
})
export class SubadminDashboardComponent {
  section: string = 'dashboard'; // default section

  onSectionSelected(selectedSection: string) {
    this.section = selectedSection;
  }
  
  constructor(private authService: AuthService){}

  navigateToLogOut(){
    this.authService.logout();
    
  }
}