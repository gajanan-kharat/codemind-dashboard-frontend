import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HireUsFollowUpResponse } from 'src/app/models/hireFromUs/followUp';
import { HireusService } from 'src/app/services/hireus.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditFollowupComponent } from '../../dialogs/edit-followup/edit-followup.component';
import { DISPLAYED_COLUMNS_COMPANY_FOLLOW } from 'src/app/models/admin-content';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  
  filteredFollowUp = new MatTableDataSource<any>();
  FollowUpStudents: any[] =[];

  displayedColumns = DISPLAYED_COLUMNS_COMPANY_FOLLOW;
 
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  role: string | null = '';
  isLoading:Boolean = false;

  constructor(private hireusService: HireusService,
              private dialog: MatDialog, 
              private toastr: ToastrService){
    this.role = sessionStorage.getItem('user_role');
}
  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
    this.filteredFollowUp.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    this.isLoading = true;
    const filters = {
    };
    this.hireusService.getHireUsFollowUp(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response:HireUsFollowUpResponse) => {
        this.isLoading = false;
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.FollowUpStudents = data;
        this.totalRecords = totalRecords;
        this.filteredFollowUp.data =  this.FollowUpStudents;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching students:', error);
      }
    );
  }
  
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudents();
  }
  
  refreshData(){
    this.FollowUpStudents = [];
    this.filteredFollowUp.data = [];
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  editFollowupStudent(student:any){
    const dialogRef = this.dialog.open(EditFollowupComponent , {
      width: '100%',
      data: { student },
      maxWidth: '50vw', 
      minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          const index = this.FollowUpStudents.findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.FollowUpStudents[index] = result;
            this.fetchStudents();
            this.hireusService.booleanSubject.next(true);
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
