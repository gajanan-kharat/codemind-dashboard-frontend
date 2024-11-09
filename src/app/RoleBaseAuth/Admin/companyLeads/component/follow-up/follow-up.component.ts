import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { COURSES } from 'src/app/models/admin-content';
import { HireUsFollowUpResponse } from 'src/app/models/HireUs/followUp';
import { HireUsInterestedResponse } from 'src/app/models/HireUs/interested';
import { HireusService } from 'src/app/services/hireus.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditFollowupComponent } from '../../dialogs/edit-followup/edit-followup.component';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  
  filteredInterested = new MatTableDataSource<any>();
  interestedStudents: any[] =[];

  // selectedCourseInterested = 'All';
  // courses: string[] = ["All",...COURSES]; 
  displayedColumns: string[] = ["name","email","inquiryStatus","date","actions"];
  dateRangeForm: FormGroup;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  role: string | null = '';

  constructor(private mongodbService: MongodbService,
              private hireusService: HireusService,
              private dialog: MatDialog, 
              private fb: FormBuilder,
              private toastr: ToastrService){
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: ['']
    });
    this.role = localStorage.getItem('user_role');
}
  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
    // this.filteredInterested.paginator = this.paginator;
    this.filteredInterested.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    const filters = {
      // course: this.selectedCourseInterested|| '',
    };
    this.hireusService.getHireUsFollowUp(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response:HireUsFollowUpResponse) => {
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.interestedStudents = data;
        this.totalRecords = totalRecords;
        this.filteredInterested.data =  this.interestedStudents;
        console.log("HireUs Intereted",this.filteredInterested.data);
        // this.fetchStudents();
        // this.filterInterested() 
        // console.log("Interested Student :=> ", this.interestedStudents);  
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  
  /*filterInterested() {
      this.filteredInterested.data = this.interestedStudents.filter(student => {
      return (!this.selectedCourseInterested || student.course === this.selectedCourseInterested);
      // && (!this.selectedBatchNotInterested || student.batch === this.selectedBatchNotInterested);
    });
    if (this.filteredInterested.paginator) {
      this.filteredInterested.paginator.firstPage();
    }

  }*/

  onCourseChange() {
    // this.filterInterested();
    this.fetchStudents();
    this.currentPage = 1;
    this.filteredInterested.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudents();
  }
  
  refreshData(){
    this.interestedStudents = [];
    this.filteredInterested.data = [];
    // this.selectedCourseInterested = '';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  editInterestedStudent(student:any){
    const dialogRef = this.dialog.open(EditFollowupComponent , {
      width: '100%',
      data: { student },
      maxWidth: '50vw', 
      minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          const index = this.interestedStudents .findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.interestedStudents[index] = result;
            // this.filterInterested();
            this.fetchStudents();
            this.mongodbService.booleanSubject.next(true);
          }      
      }
    });
  
  }
  
    applyFilterInterested(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.currentPage = 1;
      this.fetchStudents(filterValue); 
    }

    deleteHireUs(student:any){
      this.hireusService.deleteHireUsFollowUp(student._id).subscribe(
        () => {
            this.toastr.success('HireUs FollowUp deleted successfully.', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          this.fetchStudents(); 
        },
        (error) => {
          console.error('Error deleting Hireus FollowUp:', error);
          this.toastr.error('Error deleting HireUs FollowUp. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          })
        }
      );
    }

}
