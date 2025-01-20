import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './sharedModule/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './RoleBaseAuth/loginPage/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot(),
    CarouselModule,  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { 
}
