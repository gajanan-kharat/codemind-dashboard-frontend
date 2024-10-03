import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../AuthGurad/auth.guard';
import { AdminDashboardComponent } from './dashborads/admin-dashboard/admin-dashboard.component';
import { CounselorDashboardComponent } from './dashborads/counselor-dashboard/counselor-dashboard.component';
import { LoginComponent } from './Login_Page/login/login.component';
import { SubadminDashboardComponent } from './dashborads/subadmin-dashboard/subadmin-dashboard.component';



const routes: Routes = [
  // { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard],
    data: { expectedRole: 'Admin' } 
  },
  { 
    path: 'subadmin-dashboard', 
    component: SubadminDashboardComponent, 
    canActivate: [AuthGuard],
    data: { expectedRole: 'Sub-Admin' } 
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
