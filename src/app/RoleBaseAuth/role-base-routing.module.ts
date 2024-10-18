import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../AuthGurad/auth.guard';
import { AdminDashboardComponent } from './dashborads/admin-dashboard/admin-dashboard.component';
import { CounselorDashboardComponent } from './dashborads/counselor-dashboard/counselor-dashboard.component';
import { LoginComponent } from './Login_Page/login/login.component';
import { SubadminDashboardComponent } from './dashborads/subadmin-dashboard/subadmin-dashboard.component';
import { AdminContentComponent } from './Admin/admin-content/admin-content.component';
import { StudentMockContentComponent } from './Admin/student-mock-content/student-mock-content.component';
import { MainLeadsComponent } from './Admin/leads-section/main-leads/main-leads.component';
import { UserManagementComponent } from './Root-Admin/user-management/user-management.component';



const routes: Routes = [
  // { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard],
    data: { expectedRole: 'Admin' } ,
    children: [
       { path: 'dashboard', component: UserManagementComponent},
       { path: '', redirectTo: 'dashboard', pathMatch: 'full' } 
      ]
  },
  { 
    path: 'subadmin-dashboard', 
    component: SubadminDashboardComponent, 
    canActivate: [AuthGuard],
    data: { expectedRole: 'Sub-Admin' } ,
    children: [
      { path: 'dashboard', component: AdminContentComponent},
      { path: 'feedback', component: StudentMockContentComponent  }, 
      { path: 'lead', component: MainLeadsComponent}, 
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
