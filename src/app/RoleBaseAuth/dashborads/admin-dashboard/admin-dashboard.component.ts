import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  name='admin';
  // section: string = 'dashboard'; // default section

  // onSectionSelected(selectedSection: string) {
  //   this.section = selectedSection;
  // }
}
