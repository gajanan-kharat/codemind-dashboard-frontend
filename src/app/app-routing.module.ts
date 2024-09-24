import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PlacementsComponent } from './components/comman-pages/placements/placements.component';
import { EventsComponent } from './components/comman-pages/events/events.component';

const routes: Routes = [
  
  {
    path: 'contact', component: ContactUsComponent
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '', loadChildren: () => import('./RoleBaseAuth/role-base.module').then(m => m.RoleBaseModule)
  },
{
  path: 'courses',
  loadChildren: () => import('./components/comman-pages/courses/courses.module').then(m => m.CoursesModule)
},
{
  path:'placements',component:PlacementsComponent
},
{
  path: 'events', component: EventsComponent
},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
