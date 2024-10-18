import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COURSES, BATCHES, DISPLAYED_COLUMNSFOLLOW, INQUIRYSTATUSES } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditFollowupStudentComponent } from '../../dialogs/edit-followup-student/edit-followup-student.component';
import { FollowUpStudentResponse } from 'src/app/models/followup';

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

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;

  dateRangeForm: FormGroup;
  constructor(private mongodbService: MongodbService, private dialog: MatDialog, private fb: FormBuilder) {
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: ['']
    });
  }
  
  ngOnInit(): void {
    this.fetchStudents();
    this.dateRangeForm.valueChanges.subscribe(() => this.fetchStudents());
  }
  ngAfterViewInit() {
    // this.filteredFollowUp.paginator = this.paginator;
      this.filteredFollowUp.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    const filters = {
      course: this.selectedCourseFollowUp || '',
      inquiryStatus:this. selectedStatusFollowUp || '',
      startDate: this.dateRangeForm.value.start || '', 
      endDate: this.dateRangeForm.value.end || '',     
    };
    // console.log("date :=>", filters.startDate, filters.endDate, filters);
    this.mongodbService.getFollowUp(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: FollowUpStudentResponse) => {
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.followUpStudents = data;
        this.totalRecords = totalRecords;
        this.filteredFollowUp.data = this.followUpStudents;
        // this.filterFollowUp();
      },
      (error) => {
        console.error('Error fetching follow-up students:', error);
      }
    );
  }
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudents();
  }

  refreshData(){
    this.followUpStudents = [];
    this.filteredFollowUp.data = [];
    this.selectedCourseFollowUp = '';
    this.selectedStatusFollowUp = '';
    this.selectedStartDate = '';
    this.selectedEndDate = '';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.dateRangeForm.reset();
    this.fetchStudents();
  }
  
  /*filterFollowUp() {
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
  }*/

  onCourseChange() {
    this.fetchStudents();
    // this.filterFollowUp();
  }

  onStatusChange() {
    this.fetchStudents();
    //  this.filterFollowUp();   
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
                // this.filterFollowUp();
                this.fetchStudents(); 
                this.mongodbService.booleanSubject.next(true);
            }
        }
    });
}

applyFilterFollowUp(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.currentPage = 1;
  this.fetchStudents(filterValue); 
}

}
