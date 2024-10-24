import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DISPLAYED_COLUMNS, TOP_ITEMS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-student-payment-details',
  templateUrl: './student-payment-details.component.html',
  styleUrls: ['./student-payment-details.component.scss']
})
export class StudentPaymentDetailsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  
  filteredStudents = new MatTableDataSource<any>();
  students: any[] = [];

  displayedColumns: string[] = [...DISPLAYED_COLUMNS,'Payment'];
  topItems = TOP_ITEMS;
  selectedCourse = '';

  //pagination
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;

  constructor( private moongodb: MongodbService, 
               private dialog: MatDialog,
               private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchStudents(); 
  }

  ngAfterViewInit() {
    this.filteredStudents.sort = this.sort; 
  }
  
  fetchStudents(searchTerm: string = ''): void {
    const filters = {
      batch:  '',
      course: '',
      feedback: '',
      paymentStatus: '',
      placementStatus:  '',
    };
    
    this.moongodb.getStudent(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response) => {

        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.students = data;
        this.totalRecords = totalRecords;
        this.filteredStudents.data = this.students;
        // this.filterStudents(); 
        console.log('student data: ', this.students);
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


  onCourseClick(course: string) {
    this.selectedCourse = course;
  }

}
