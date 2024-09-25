import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RoleBaseRoutingModule } from './role-base-routing.module';
import { AdminContentComponent } from './Admin/admin-content/admin-content.component';
import { AdminDashboardComponent } from './dashborads/admin-dashboard/admin-dashboard.component';
import { CounselorDashboardComponent } from './dashborads/counselor-dashboard/counselor-dashboard.component';
import { EditStudentDialogComponent } from './Admin/dialogs/edit-student-dialog/edit-student-dialog.component';
import { LoginComponent } from './Login_Page/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDashboardComponent } from './dashborads/student-dashboard/student-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../sharedModule/material.module';
import { StudentMockContentComponent } from './Admin/student-mock-content/student-mock-content.component';
import { EditStudentmockDialogComponent } from './Admin/dialogs/edit-studentmock-dialog/edit-studentmock-dialog.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LedsComponent } from './Admin/leds/leds.component';
import { EditInquiryStudentComponent } from './Admin/dialogs/edit-inquiry-student/edit-inquiry-student.component';
import { EditFollowupStudentComponent } from './Admin/dialogs/edit-followup-student/edit-followup-student.component';
import { EditBootcampStudentComponent } from './Admin/dialogs/edit-bootcamp-student/edit-bootcamp-student.component';
import { StudentFilterPipe } from '../pipes/student-filter.pipe';
import { UserManagementComponent } from './Root-Admin/user-management/user-management.component';
import { EditUserDialogComponent } from './Root-Admin/dialogs/edit-user-dialog/edit-user-dialog.component';
import { SidenavHeaderComponent } from './sidenav-header/sidenav-header.component';

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
