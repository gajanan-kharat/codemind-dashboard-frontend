import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authGurad/auth.guard';
import { AdminDashboardComponent } from './dashborads/admin-dashboard/admin-dashboard.component';
import { CounselorDashboardComponent } from './dashborads/counselor-dashboard/counselor-dashboard.component';
import { LoginComponent } from './loginPage/login/login.component';
import { SubadminDashboardComponent } from './dashborads/subadmin-dashboard/subadmin-dashboard.component';
import { AdminContentComponent } from './Admin/admin-content/admin-content.component';
import { StudentMockContentComponent } from './Admin/collegeData-section/component/student-mock-content/student-mock-content.component';
import { MainLeadsComponent } from './Admin/leads-section/main-leads/main-leads.component';
import { UserManagementComponent } from './rootAdmin/component/user-management/user-management.component';
import { TotalFeesComponent } from './Admin/totalFees/total-fees/total-fees.component';
import { MainCompanyLeadsComponent } from './Admin/companyLeads/main-company-leads/main-company-leads.component';
import { CollegeInfoComponent } from './Admin/collegeData-section/component/college-info/college-info.component';
import { ScholarshipComponent } from './Admin/scholarship/component/scholarship/scholarship.component';
import { MainBootcampComponent } from './Admin/bootcamp/main-bootcamp/main-bootcamp.component';
import { NewIssuesComponent } from './Admin/studentIssue/component/new-issues/new-issues.component';

const routes: Routes = [
  // { path: 'signup', component: SignupComponent },
  // { path: 'codemindDashboard', component: LoginComponent },
  { path: 'codemind-dashboard', component: LoginComponent },
  { path: '', redirectTo: '/codemind-dashboard', pathMatch: 'full' },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'Admin' },
    children: [
      { path: 'dashboard', component: UserManagementComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'subadmin-dashboard',
    component: SubadminDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'Sub-Admin' },
    children: [
      { path: 'dashboard', component: AdminContentComponent },
      // { path: 'feedback', component: StudentMockContentComponent  }, 
      { path: 'lead', component: MainLeadsComponent },
      { path: 'totalFees', component: TotalFeesComponent },
      { path: 'companyLeads', component: MainCompanyLeadsComponent },
      { path: 'collegeData', component: CollegeInfoComponent },
      { path: 'scholarshipData', component: ScholarshipComponent },
      { path: 'bootcamp', component: MainBootcampComponent },
      { path: 'studentIssue', component: NewIssuesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'counselor-dashboard',
    component: CounselorDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'Counselor' }
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleBaseRoutingModule { }
