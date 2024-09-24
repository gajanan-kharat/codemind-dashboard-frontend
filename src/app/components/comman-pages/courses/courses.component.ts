import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  internshipCourses: any[] = [];
  jobTrainingCourses: any[] = [];
  targetCircles: any[] = [];
  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
}