import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/comman-pages/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/comman-pages/footer/footer.component';
//import { ElearningSchoolComponent } from './components/main-pages/home/elearning-school.component';
import { WhyChooseUsComponent } from './components/comman-pages/why-choose-us/why-choose-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { EnrollBtnComponent } from './components/comman-pages/enroll-btn/enroll-btn.component';
import { CoursesComponent } from './components/comman-pages/courses/courses.component';
import { HomeComponent } from './components/main-pages/home/home.component';
import { CoursesDetailsComponent } from './components/comman-pages/courses/courses-details/courses-details.component';
import { SlidebarComponent } from './components/comman-pages/courses/slidebar/slidebar.component';
import { PlacementsComponent } from './components/comman-pages/placements/placements.component';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { EventsComponent } from './components/comman-pages/events/events.component';

import { TestimonialComponent } from './components/comman-pages/testimonial/testimonial.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SuccessStoriesComponent } from './components/comman-pages/testimonial/success-stories/success-stories.component';
import { StudentReviewsComponent } from './components/comman-pages/testimonial/student-reviews/student-reviews.component';
import { PricingSectionComponent } from './components/comman-pages/pricing-section/pricing-section.component';
import { CoursesMainComponent } from './components/main-pages/courses-main/courses-main.component';
import { MapSectionComponent } from './components/comman-pages/map-section/map-section.component';
import { HiringPatnersComponent } from './components/comman-pages/hiring-patners/hiring-patners.component';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WhyChooseUsComponent,
    ContactUsComponent,
    EnrollBtnComponent,
    WhyChooseUsComponent,
    CoursesComponent,
    HomeComponent,
    CoursesDetailsComponent,
    SlidebarComponent,
    PlacementsComponent,
    EventsComponent,
    TestimonialComponent,
    SuccessStoriesComponent,
    StudentReviewsComponent,
    PricingSectionComponent,
    CoursesMainComponent,
    MapSectionComponent,
    HiringPatnersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot(),
    MatStepperModule,
    MatButtonModule,
    CarouselModule,
    MatExpansionModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { 
}
