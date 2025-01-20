import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-issuses-dashboard',
  templateUrl: './student-issuses-dashboard.component.html',
  styleUrls: ['./student-issuses-dashboard.component.scss']
})
export class StudentIssusesDashboardComponent {
 
  constructor(private authService: AuthService){}

  navigateToLogOut(){
    this.authService.logout();
  }
}
