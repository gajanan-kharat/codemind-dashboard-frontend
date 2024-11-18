import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { COURSES, BATCHES, DISPLAYED_COLUMNSFOLLOW, INQUIRYSTATUSES } from 'src/app/models/admin-content';
import { FollowUpStudentResponse } from 'src/app/models/followup';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditFollowupStudentComponent } from '../../../leads-section/dialogs/edit-followup-student/edit-followup-student.component';
import { EditBootcampFollowupStudentComponent } from '../../dialogs/edit-bootcamp-followup-student/edit-bootcamp-followup-student.component';
import { BootcampService } from 'src/app/services/bootcamp.service';

@Component({
  selector: 'app-bootcamp-followup-student',
  templateUrl: './bootcamp-followup-student.component.html',
  styleUrls: ['./bootcamp-followup-student.component.scss']
})
export class BootcampFollowupStudentComponent {
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
  role: string | null = '';

  dateRangeForm: FormGroup;
  constructor(private mongodbService: MongodbService, private dialog: MatDialog, 
              private fb: FormBuilder, private toastr: ToastrService,
              private bootcampService: BootcampService) {
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: ['']
    });
    this.role = localStorage.getItem('user_role');
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
    this.bootcampService.getBootcampFollowUp(this.currentPage, this.limit, searchTerm, filters).subscribe(
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
    const dialogRef = this.dialog.open(EditBootcampFollowupStudentComponent, {
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

deleteStudent(student:any){
  console.log(student._id);
  this.bootcampService.deleteBootcampFollowUpStudent(student._id).subscribe(
    () => {
        this.toastr.success('Inquiry Student deleted successfully.', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
      this.fetchStudents(); 
    },
    (error) => {
      console.error('Error deleting Inquiry Student:', error);
      this.toastr.error('Error deleting Inquiry Student. Please try again.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      })
    }
  );
}


}



