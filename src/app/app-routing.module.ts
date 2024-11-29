import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', redirectTo: 'codemind-dashboard', pathMatch: 'full' },

  {
    path: 'codemind-dashboard', loadChildren: () => import('./RoleBaseAuth/role-base.module').then(m => m.RoleBaseModule)
  },

  { path: '**', redirectTo: 'codemind-dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
