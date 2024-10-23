import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-subadmin-dashboard',
  templateUrl: './subadmin-dashboard.component.html',
  styleUrls: ['./subadmin-dashboard.component.scss']
})
export class SubadminDashboardComponent {
  // section: string = 'dashboard'; 

  // onSectionSelected(selectedSection: string) {
  //   this.section = selectedSection;
  // }
  name='dashboard';
  constructor(private authService: AuthService){}

  navigateToLogOut(){
    this.authService.logout();
    
  }
}
