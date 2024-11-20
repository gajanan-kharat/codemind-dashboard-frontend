import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ISSUESTATUS, SCHOLARSHIP_ITEMS } from 'src/app/models/admin-content';
import { ScholarshipDataResponse } from 'src/app/models/scholrshipData/scholarship';
import { ScholarshipService } from 'src/app/services/scholarship.service';
import { EditScholarshipComponent } from '../../../scholarship/dialogs/edit-scholarship/edit-scholarship.component';
import { StudentIssueService } from 'src/app/services/student-issue.service';
import { EditNewIssuesComponent } from '../../dialogs/edit-new-issues/edit-new-issues.component';
import { EditInterestedStudentComponent } from '../../../leads-section/dialogs/edit-interested-student/edit-interested-student.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-issues',
  templateUrl: './new-issues.component.html',
  styleUrls: ['./new-issues.component.scss']
})
export class NewIssuesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  
  dateRangeForm!: FormGroup;
  
  filteredStudentIssuesData = new MatTableDataSource<any>();
  role: string | null = '';
  studentIssuesInfo: any[] = [];

  topItems =  ISSUESTATUS ;   
  displayedColumns: string[] = ['name','email','mobileNumber','status','Actions'];
  
  //selectedUniversity = 'All';
  selectedName = '';
  //selectedDistrictStatus : string = 'All'; 

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;

  /*startDate: Date | null = null;
  endDate: Date | null = null;*/
  
  constructor(  private studentIssueService: StudentIssueService, 
               private dialog: MatDialog,
               private toastr: ToastrService,
               private fb: FormBuilder) {
  this.dateRangeForm = this.fb.group({
     start: [''],
     end: ['']
    });
    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchStudentIssues(); 
    this.dateRangeForm.valueChanges.subscribe(() => this.fetchStudentIssues());
  }

  ngAfterViewInit() {
    this.filteredStudentIssuesData.sort = this.sort; 
  }
    
  
    /*onDistrictChange() {
      this.currentPage = 1;
      this.fetchCollegeData();
      this.filteredCollegeData.paginator = this.paginator;
 
    }*/
  
    onClick(name: string) {
      this.selectedName = name;
      this.currentPage = 1;
      this.fetchStudentIssues();
      this.filteredStudentIssuesData.paginator = this.paginator;
    
    }
  
    /*onUniversityChange() {
      this.fetchCollegeData();
      this.currentPage = 1;
      this.filteredCollegeData.paginator = this.paginator;
    }

    onDateChange(): void {
      this.currentPage = 1;
      this.fetchCollegeData();
      this.filteredCollegeData.paginator = this.paginator;
    }*/

  fetchStudentIssues(searchTerm: string = ''): void {
     const filters = {
      issueStatus: this.selectedName || '',
      startDate: this.dateRangeForm.value.start || '', 
      endDate: this.dateRangeForm.value.end || '',   
       /*universityName:  this.selectedUniversity || '',
       visitedStatus: this.selectedName || '',
       district: this.selectedDistrictStatus  || '',
       startDate: this.startDate ? this.startDate.toISOString() : '',
       endDate: this.endDate ? this.endDate.toISOString() : ''*/
    };
    this.studentIssueService.getStudentIssuesData(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: any) => {
        // console.log("scholarship:=>",response);
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.studentIssuesInfo = data;
        this.totalRecords = totalRecords;
        this.filteredStudentIssuesData.data = this.studentIssuesInfo;
   
      },
      (error) => {
        console.error('Error fetching students Mock:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudentIssues();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudentIssues(filterValue); 
  }

  refreshData(){
    this.studentIssuesInfo= [];
    this.filteredStudentIssuesData.data = [];
    this.selectedName = '';
    
    /*this.selectedDistrictStatus = 'All'; 
    this.selectedUniversity  = 'All';
    this.startDate = null;
    this.endDate = null;*/
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.dateRangeForm.reset();
    this.fetchStudentIssues();
  }
 
  editStudent(student: any) {
    const dialogRef = this.dialog.open(EditNewIssuesComponent, {
      width: '80%',
      data: { student },
      maxWidth: '80vw', 
      minWidth: '300px',
    });
  //  console.log("scholarship:=>",student);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.studentIssuesInfo.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.studentIssuesInfo[index] = result;
          this.fetchStudentIssues();
        }
      }
    });
  }

  deleteScholarship(student:any){
    this.studentIssueService.deleteStudentIssuesData(student._id).subscribe(
      () => {
          this.toastr.success('student Issue Data deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudentIssues();
      },
      (error) => {
        console.error('Error deleting student issue Data :', error);
        this.toastr.error('Error deleting student issue Data . Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }

  addNewStudentIssue(){
    const dialogRef = this.dialog.open(EditNewIssuesComponent, {
      width: '50%',
      data: { student:null }, 
      // maxWidth: '80vw',
      // minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentIssuesInfo.push(result);
        this.fetchStudentIssues();
      }
    });
  }

}
