import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';
import { RouterModule, Routes } from '@angular/router';
import { CoursesMainComponent } from '../../main-pages/courses-main/courses-main.component';

const routes: Routes = [
  { path: '', component: CoursesMainComponent },  // Ensure this route is also configured if necessary
  { path: ':id', component: CoursesDetailsComponent }
];

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
