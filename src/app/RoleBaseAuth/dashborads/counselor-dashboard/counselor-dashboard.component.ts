import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-counselor-dashboard',
  templateUrl: './counselor-dashboard.component.html',
  styleUrls: ['./counselor-dashboard.component.scss']
})
export class CounselorDashboardComponent {
  
  name='counselor';

  constructor(private authService: AuthService){}

  navigateToLogOut(){
    this.authService.logout();
  }
}
