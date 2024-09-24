import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RoleBaseRoutingModule } from './role-base-routing.module';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CounselorDashboardComponent } from './counselor-dashboard/counselor-dashboard.component';
import { EditStudentDialogComponent } from './edit-student-dialog/edit-student-dialog.component';
import { LoginComponent } from './login/login.component';
import { SidenavHeaderComponent } from './sidenav-header/sidenav-header.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../material/material.module';
import { StudentMockContentComponent } from './student-mock-content/student-mock-content.component';
import { EditStudentmockDialogComponent } from './edit-studentmock-dialog/edit-studentmock-dialog.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LedsComponent } from './leds/leds.component';
import { EditInquiryStudentComponent } from './edit-inquiry-student/edit-inquiry-student.component';
import { EditFollowupStudentComponent } from './edit-followup-student/edit-followup-student.component';
import { EditBootcampStudentComponent } from './edit-bootcamp-student/edit-bootcamp-student.component';
import { StudentFilterPipe } from '../pipes/student-filter.pipe';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    CounselorDashboardComponent,
    SidenavHeaderComponent,
    AdminContentComponent,
    EditStudentDialogComponent,
    StudentMockContentComponent,
    EditStudentmockDialogComponent,
    EditProfileComponent,
    LedsComponent,
    EditInquiryStudentComponent,
    EditFollowupStudentComponent,
    EditBootcampStudentComponent,
    StudentFilterPipe,
    UserManagementComponent,
    EditUserDialogComponent
  ],
  imports: [
    CommonModule,
    RoleBaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  providers: [DatePipe],
})
export class RoleBaseModule { }
