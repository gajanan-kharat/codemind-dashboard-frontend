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
import { ToastrService } from 'ngx-toastr';

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
  role: string | null = '';
  isLoading:Boolean = false; 

  dateRangeForm: FormGroup;
  constructor(private mongodbService: MongodbService, private dialog: MatDialog, 
              private fb: FormBuilder, private toastr: ToastrService) {
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
      this.filteredFollowUp.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    this.isLoading =  true;
    const filters = {
      course: this.selectedCourseFollowUp || '',
      inquiryStatus:this. selectedStatusFollowUp || '',
      startDate: this.dateRangeForm.value.start || '', 
      endDate: this.dateRangeForm.value.end || '',     
    };
    this.mongodbService.getFollowUp(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: FollowUpStudentResponse) => {
        this.isLoading =  false;
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.followUpStudents = data;
        this.totalRecords = totalRecords;
        this.filteredFollowUp.data = this.followUpStudents;
      },
      (error) => {
        this.isLoading = false;
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
  
  onCourseChange() {
    this.fetchStudents();
  }

  onStatusChange() {
    this.fetchStudents();
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
  this.mongodbService.deleteFollowUpStudent(student._id).subscribe(
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
