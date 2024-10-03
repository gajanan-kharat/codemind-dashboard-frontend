import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COURSES, BATCHES, DISPLAYED_COLUMNSFOLLOW, INQUIRYSTATUSES } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditFollowupStudentComponent } from '../../dialogs/edit-followup-student/edit-followup-student.component';

@Component({
  selector: 'app-followup-student',
  templateUrl: './followup-student.component.html',
  styleUrls: ['./followup-student.component.scss']
})
export class FollowupStudentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  filteredFollowUp = new MatTableDataSource<any>();
  followUpStudents: any[] = [];

  courses: string[] = COURSES; 
  batches: string[] = BATCHES;
  displayedColumnsFollow:string[] = DISPLAYED_COLUMNSFOLLOW;
  inquiryStatuses: string[] = INQUIRYSTATUSES;

  selectedCourseFollowUp = '';
  selectedStatusFollowUp = '';

  selectedStartDate = '';
  selectedEndDate = '';

  dateRangeForm: FormGroup;
  constructor(private mongodbService: MongodbService, private dialog: MatDialog, private fb: FormBuilder) {
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: ['']
    });
  }
  
  ngOnInit(): void {
    this.fetchStudents();
    this.dateRangeForm.valueChanges.subscribe(() => this.filterFollowUp());
  }
  ngAfterViewInit() {
    this.filteredFollowUp.paginator = this.paginator;
      this.filteredFollowUp.sort = this.sort; 
  }

  fetchStudents(): void {
    this.mongodbService.getFollowUp().subscribe(
      (data) => {
        this.followUpStudents = data;
        // this.followUpDataLength =  this.followUpStudents.length;
        this.filterFollowUp();
      },
      (error) => {
        console.error('Error fetching follow-up students:', error);
      }
    );
  }

  filterFollowUp() {
    const { start, end } = this.dateRangeForm.value;
    this.filteredFollowUp.data = this.followUpStudents.filter(student => {
      const studentDate = new Date(student.date);
      const isDateInRange = (!start || studentDate >= new Date(start)) && (!end || studentDate <= new Date(end));
      return isDateInRange &&
             (!this.selectedCourseFollowUp || student.course === this.selectedCourseFollowUp) &&
             (!this.selectedStatusFollowUp || student.inquiryStatus === this.selectedStatusFollowUp);
    });
    if (this.filteredFollowUp.paginator) {
      this.filteredFollowUp.paginator.firstPage();
    }
    // this.filteredFollowUp.paginator = this.paginator;
  }

  onCourseChange() {
    this.filterFollowUp();
  }

  onStatusChange() {
     this.filterFollowUp();   
  }

  editFollowUpStudent(student: any) {
    const dialogRef = this.dialog.open(EditFollowupStudentComponent, {
        width: '100%',
        data: { student },
        maxWidth: '80vw',
        minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
            const index = this.followUpStudents.findIndex(s => s._id === student._id);
            if (index !== -1) {
                this.followUpStudents[index] = result;
                this.filterFollowUp();
                this.fetchStudents(); 
            }
        }
    });
}

applyFilterFollowUp(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filteredFollowUp.filter = filterValue.trim().toLowerCase();

  if (this.filteredFollowUp.paginator) {
    this.filteredFollowUp.paginator.firstPage();
  }
}

}
