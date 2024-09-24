import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enroll-btn',
  templateUrl: './enroll-btn.component.html',
  styleUrls: ['./enroll-btn.component.scss']
})
export class EnrollBtnComponent {

  constructor(private router:Router){}
  navigateToEnroll(){
    this.router.navigate(['/contact']);
  }
}
