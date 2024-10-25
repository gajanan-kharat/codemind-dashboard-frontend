import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RoleBaseRoutingModule } from './role-base-routing.module';
import { AdminContentComponent } from './Admin/admin-content/admin-content.component';
import { AdminDashboardComponent } from './dashborads/admin-dashboard/admin-dashboard.component';
import { CounselorDashboardComponent } from './dashborads/counselor-dashboard/counselor-dashboard.component';
import { EditStudentDialogComponent } from './Admin/dialogs/edit-student-dialog/edit-student-dialog.component';
import { LoginComponent } from './Login_Page/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../sharedModule/material.module';
import { StudentMockContentComponent } from './Admin/student-mock-content/student-mock-content.component';
import { EditStudentmockDialogComponent } from './Admin/dialogs/edit-studentmock-dialog/edit-studentmock-dialog.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditInquiryStudentComponent } from './Admin/leads-section/dialogs/edit-inquiry-student/edit-inquiry-student.component';
import { EditFollowupStudentComponent } from './Admin/leads-section/dialogs/edit-followup-student/edit-followup-student.component';
import { EditBootcampStudentComponent } from './Admin/leads-section/dialogs/edit-bootcamp-student/edit-bootcamp-student.component';
import { StudentFilterPipe } from '../pipes/student-filter.pipe';
import { UserManagementComponent } from './Root-Admin/user-management/user-management.component';
import { EditUserDialogComponent } from './Root-Admin/dialogs/edit-user-dialog/edit-user-dialog.component';
import { SidenavHeaderComponent } from './sidenav-header/sidenav-header.component';
import { EditNotintrestedStudentComponent } from './Admin/leads-section/dialogs/edit-notintrested-student/edit-notintrested-student.component';
import { InterestedStudentComponent } from './Admin/leads-section/components/interested-student/interested-student.component';
import { EditInterestedStudentComponent } from './Admin/leads-section/dialogs/edit-interested-student/edit-interested-student.component';
import { InquiryStudentComponent } from './Admin/leads-section/components/inquiry-student/inquiry-student.component';
import { FollowupStudentComponent } from './Admin/leads-section/components/followup-student/followup-student.component';
import { BootcampStudentComponent } from './Admin/leads-section/components/bootcamp-student/bootcamp-student.component';
import { NotinterestedStudentComponent } from './Admin/leads-section/components/notinterested-student/notinterested-student.component';
import { MainLeadsComponent } from './Admin/leads-section/main-leads/main-leads.component';
import { SubadminDashboardComponent } from './dashborads/subadmin-dashboard/subadmin-dashboard.component';
import { EditPaymentDialogComponent } from './Admin/dialogs/edit-payment-dialog/edit-payment-dialog.component';
import { TotalFeesComponent } from './Admin/totalFees/total-fees/total-fees.component';
import { NewCompanyLeadsComponent } from './Admin/companyLeads/component/new-company-leads/new-company-leads.component';
import { MainCompanyLeadsComponent } from './Admin/companyLeads/main-company-leads/main-company-leads.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    AdminDashboardComponent,
    CounselorDashboardComponent,
    SidenavHeaderComponent,
    AdminContentComponent,
    EditStudentDialogComponent,
    StudentMockContentComponent,
    EditStudentmockDialogComponent,
    EditProfileComponent,
    EditInquiryStudentComponent,
    EditFollowupStudentComponent,
    EditBootcampStudentComponent,
    StudentFilterPipe,
    UserManagementComponent,
    EditUserDialogComponent,
    EditNotintrestedStudentComponent,
    InterestedStudentComponent,
    EditInterestedStudentComponent,
    InquiryStudentComponent,
    FollowupStudentComponent,
    BootcampStudentComponent,
    NotinterestedStudentComponent,
    MainLeadsComponent,
    SubadminDashboardComponent,
    EditPaymentDialogComponent,
    TotalFeesComponent,
    NewCompanyLeadsComponent,
    MainCompanyLeadsComponent
  
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
