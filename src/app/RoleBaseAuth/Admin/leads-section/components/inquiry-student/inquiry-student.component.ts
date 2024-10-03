import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COURSES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditInquiryStudentComponent } from '../../dialogs/edit-inquiry-student/edit-inquiry-student.component';

@Component({
  selector: 'app-inquiry-student',
  templateUrl: './inquiry-student.component.html',
  styleUrls: ['./inquiry-student.component.scss']
})
export class InquiryStudentComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  filteredLeads = new MatTableDataSource<any>();

  Inquirystudents: any[] = [];

  courses: string[] = COURSES; 
  // batches: string[] = BATCHES;
  displayedColumns: string[] = DISPLAYED_COLUMNS;

  selectedCourseLeads = '';
  constructor(private mongodbService: MongodbService, private dialog: MatDialog,){}

  ngOnInit(): void {
    this.fetchStudents();
  }
  
  ngAfterViewInit() {
    this.filteredLeads.paginator = this.paginator;
    this.filteredLeads.sort = this.sort; 
  }

  fetchStudents(): void {
    this.mongodbService.getInquiryStudent().subscribe(
      (data) => {
        this.Inquirystudents = data;
        // this.InquiryDataLength=this.Inquirystudents.length;
        this.filterLeads();
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  filterLeads() {
    this.filteredLeads.data = this.Inquirystudents.filter(student =>
      (!this.selectedCourseLeads || student.course === this.selectedCourseLeads)
    );
    if (this.filteredLeads.paginator) {
      this.filteredLeads.paginator.firstPage();
    }
    // this.filteredLeads.paginator = this.paginator;
  }
  onCourseChange() {
      this.filterLeads();
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredLeads.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredLeads.paginator) {
      this.filteredLeads.paginator.firstPage();
    }
  }
  editStudent(student: any) {
    console.log("Student data =>", student);
    const dialogRef = this.dialog.open(EditInquiryStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw', 
    minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          const index = this.Inquirystudents.findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.Inquirystudents[index] = result;
            this.filterLeads();
            this.fetchStudents();
          }
      }
    });
  }

}
