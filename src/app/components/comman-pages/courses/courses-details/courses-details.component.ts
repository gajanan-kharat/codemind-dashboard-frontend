import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: [
    './courses-details.component.scss',
    
  ],
  
})
export class CoursesDetailsComponent {
  courseDetail: any;
  dynamicText: string = '';
  stepperOrientation: Observable<StepperOrientation>;
  constructor(private route: ActivatedRoute,
    private courseService: CoursesService, private breakpointObserver: BreakpointObserver) {

      this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }
  ngOnInit(): void {
    const courseUrl = this.route.snapshot.paramMap.get('id');
    if (courseUrl) {
      this.getCourseDetails(courseUrl);
      this.dynamicText = this.courseDetail.heading;
    }
   

  }
 
 
  getCourseDetails(courseUrl: string) {

    this.courseDetail = this.courseService.getCourseDetails(courseUrl);
    console.log("course Detail :=> ",this.courseDetail);
    
  }



getCircleClass(index: number): string {
  const classes = ['orange', 'blue', 'yellow', 'light-blue','purple','peach','pink '];
  return `circle ${classes[index % classes.length]}`;
}

getContentClass(index: number): string {
  const classes = ['orange', 'blue', 'yellow', 'light-blue','purple','peach','pink '];
  return `content ${classes[index % classes.length]}`;
}

getArrowClass(index: number, length: number): string {
  if (index >= 0 && index <= 2) {
    // Cards 1 to 3
    return 'fa-solid fa-arrow-right';
  } else if (index === 3) {
    // Card 4
    return 'fa-solid fa-arrow-down';
  } else if (index >= 4 && index <= 6) {
    // Cards 5 to 7
    return 'fa-solid fa-arrow-left';
  } else if (index === 7) {
    // Card 8
    return ''; // No arrow for Card 8
  } else {
    return '';
  }
}





}
