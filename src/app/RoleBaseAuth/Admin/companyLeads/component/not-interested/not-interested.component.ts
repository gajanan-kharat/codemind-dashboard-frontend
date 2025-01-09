import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DISPLAYED_COLUMNS_COMPANY_FOLLOW } from 'src/app/models/admin-content';
import { HireUsNotInterestedResponse } from 'src/app/models/hireFromUs/notInterested';
import { HireusService } from 'src/app/services/hireus.service';
import { EditNotinterestedComponent } from '../../dialogs/edit-notinterested/edit-notinterested.component';

@Component({
  selector: 'app-not-interested',
  templateUrl: './not-interested.component.html',
  styleUrls: ['./not-interested.component.scss']
})
export class NotInterestedComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  
  filteredNotInterested = new MatTableDataSource<any>();
  NotInterestedStudents: any[] =[];
 
  displayedColumns=DISPLAYED_COLUMNS_COMPANY_FOLLOW;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;
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
    this.filteredNotInterested.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    this.isLoading = true;
    const filters = {
    };
    this.hireusService.getHireUsNotInterested(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response:HireUsNotInterestedResponse) => {
        this.isLoading = false;
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.NotInterestedStudents = data;
        this.totalRecords = totalRecords;
        this.filteredNotInterested.data =  this.NotInterestedStudents;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching students:', error);
      }
    );
  }
  
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchStudents();
  }
  
  refreshData(){
    this. NotInterestedStudents = [];
    this.filteredNotInterested.data = [];
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  editInterestedStudent(student:any){
    const dialogRef = this.dialog.open(EditNotinterestedComponent , {
      width: '50%',
      data: { student },
      maxWidth: '80vw', 
      minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.NotInterestedStudents .findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.NotInterestedStudents[index] = result;
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
      this.hireusService.deleteHireUsNotInterested(student._id).subscribe(
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
