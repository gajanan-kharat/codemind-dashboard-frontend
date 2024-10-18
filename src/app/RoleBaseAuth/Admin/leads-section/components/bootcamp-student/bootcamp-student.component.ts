import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DISPLAYED_COLUMNSBOOTCAMP, PAYMENT_STATUS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditBootcampStudentComponent } from '../../dialogs/edit-bootcamp-student/edit-bootcamp-student.component';
import { BootcampStudentResponse } from 'src/app/models/bootcampStudents';

@Component({
  selector: 'app-bootcamp-student',
  templateUrl: './bootcamp-student.component.html',
  styleUrls: ['./bootcamp-student.component.scss']
})
export class BootcampStudentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  filteredBootCamp = new MatTableDataSource<any>();
  bootCampStudents: any[] = [];

  displayedColumnsBootcamp:string[] = DISPLAYED_COLUMNSBOOTCAMP;
  payment_status: string[] = ["All",...PAYMENT_STATUS]; 

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;

  selectedPaymentBootCamp = 'All';
  constructor(private mongodbService: MongodbService, private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
      // this.filteredBootCamp.paginator = this.paginator;
      this.filteredBootCamp.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    const filters = {
      paymentStatus: this.selectedPaymentBootCamp|| '',
    };
     this.mongodbService.getBootCamp(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response:BootcampStudentResponse) => {
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.bootCampStudents = data;
        this.totalRecords = totalRecords;
        this.filteredBootCamp.data =  this.bootCampStudents;
        // this.filterBootCamp();
      },
      (error) => {
        console.error('Error fetching bootcamp students:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudents();
  }
  
  refreshData(){
    this.bootCampStudents = [];
    this.filteredBootCamp.data = [];
    this.selectedPaymentBootCamp = '';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  /*filterBootCamp() {
    this.filteredBootCamp.data = this.bootCampStudents.filter(student =>
      (!this.selectedPaymentBootCamp|| student.paymentStatus === this.selectedPaymentBootCamp)
    );
    if (this.filteredBootCamp.paginator) {
      this.filteredBootCamp.paginator.firstPage();
    }
  } */

  onCourseChange() {
    // this.filterBootCamp();
    this.currentPage = 1;
    this.fetchStudents();
    this.filteredBootCamp.paginator = this.paginator;
  }

  editBootcampStudent(student: any) {
    const dialogRef = this.dialog.open(EditBootcampStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw',
      minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.bootCampStudents.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.bootCampStudents[index] = result;
          // this.filterBootCamp();
          this.fetchStudents();
          this.mongodbService.booleanSubject.next(true);
        }
      }
    });
  }

  applyFilterBootcamp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudents(filterValue); 
  }

  
}
