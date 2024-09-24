import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {
  section: string = 'dashboard'; // default section

  onSectionSelected(selectedSection: string) {
    this.section = selectedSection;
  }
  
  constructor(private authService: AuthService){}

  navigateToLogOut(){
    this.authService.logout();
    
  }
}
