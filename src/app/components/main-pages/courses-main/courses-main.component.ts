import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { MainCoursesService } from 'src/app/services/main-courses.service';

@Component({
  selector: 'app-courses-main',
  templateUrl: './courses-main.component.html',
  styleUrls: ['./courses-main.component.scss']
})
export class CoursesMainComponent {
  services: any[] = [];
constructor(private mainservice:MainCoursesService){

}
ngOnInit(): void {
  this.services = this.mainservice.getServices();
}
}
