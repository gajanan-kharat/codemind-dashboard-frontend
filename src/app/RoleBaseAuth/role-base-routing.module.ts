import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../AuthGurad/auth.guard';
import { AdminDashboardComponent } from './dashborads/admin-dashboard/admin-dashboard.component';
import { CounselorDashboardComponent } from './dashborads/counselor-dashboard/counselor-dashboard.component';
import { LoginComponent } from './Login_Page/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDashboardComponent } from './dashborads/student-dashboard/student-dashboard.component';
import { LedsComponent } from './Admin/leds/leds.component';


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
    path: 'student-dashboard', 
    component: StudentDashboardComponent, 
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
