import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { COURSES, DISPLAYED_COLUMNS_COMPANY_FOLLOW } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { HireusService } from 'src/app/services/hireus.service';
import { HireUsInterestedResponse } from 'src/app/models/hireFromUs/interested';
import { EditInterestedComponent } from '../../dialogs/edit-interested/edit-interested.component';

@Component({
  selector: 'app-interested',
  templateUrl: './interested.component.html',
  styleUrls: ['./interested.component.scss']
})
export class InterestedComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  
  filteredInterested = new MatTableDataSource<any>();
  interestedStudents: any[] =[];

  displayedColumns =  DISPLAYED_COLUMNS_COMPANY_FOLLOW;
  isLoading:Boolean = false;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  role: string | null = '';

  constructor(private hireusService: HireusService,
              private dialog: MatDialog, 
              private toastr: ToastrService){
    this.role = localStorage.getItem('user_role');
}
  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
    this.filteredInterested.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    this.isLoading = true;
    const filters = {
    };
    this.hireusService.getHireUsInterested(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response:HireUsInterestedResponse) => {
        this.isLoading = false;
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.interestedStudents = data;
        this.totalRecords = totalRecords;
        this.filteredInterested.data =  this.interestedStudents;  
      },
      (error) => {
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
    this.interestedStudents = [];
    this.filteredInterested.data = [];
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  editInterestedStudent(student:any){
    const dialogRef = this.dialog.open(EditInterestedComponent , {
      width: '100%',
      data: { student },
      maxWidth: '50vw', 
    minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          const index = this.interestedStudents.findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.interestedStudents[index] = result;
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
      this.hireusService.deleteHireUsInterested(student._id).subscribe(
        () => {
            this.toastr.success('HireUs Interested deleted successfully.', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          this.fetchStudents(); 
        },
        (error) => {
          console.error('Error deleting Hireus Interested:', error);
          this.toastr.error('Error deleting HireUs Interested. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          })
        }
      );
    }

}
