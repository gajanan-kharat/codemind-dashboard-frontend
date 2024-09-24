import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  styleUrls: ['./pricing-section.component.scss']
})
export class PricingSectionComponent {
  coursesdetail: any[] = [];
  currentSlide = 0;
  slideInterval: any;
constructor(private courses:CoursesService){
 
}
ngOnInit(): void {
this.coursesdetail=this.courses.getCourses()
this.startSlideShow();
}

startSlideShow() {
  this.slideInterval = setInterval(() => {
    this.currentSlide = (this.currentSlide + 1) % this.coursesdetail.length;
    const nextSlide = document.getElementById('slide' + (this.currentSlide + 1)) as HTMLInputElement;
    nextSlide.checked = true;
  }, 3000); // Change slide every 3 seconds
}

pauseSlideShow() {
  if (this.slideInterval) {
    clearInterval(this.slideInterval);
  }
}

resumeSlideShow() {
  this.startSlideShow();
}

ngOnDestroy() {
  if (this.slideInterval) {
    clearInterval(this.slideInterval);
  }
}

}
