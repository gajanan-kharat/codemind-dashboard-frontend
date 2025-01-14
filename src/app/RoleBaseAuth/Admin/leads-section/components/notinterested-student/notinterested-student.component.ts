import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BATCHES, COURSES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditNotintrestedStudentComponent } from '../../dialogs/edit-notintrested-student/edit-notintrested-student.component';
import { NotInterestedStudentResponse } from 'src/app/models/notInterestedStudents';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notinterested-student',
  templateUrl: './notinterested-student.component.html',
  styleUrls: ['./notinterested-student.component.scss']
})
export class NotinterestedStudentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  filteredNotInterested = new MatTableDataSource<any>();
  notInterestedStudents: any[] =[];

  displayedColumns: string[] = DISPLAYED_COLUMNS;

  courses: string[] = ["All",...COURSES]; 
 
  selectedCourseNotInterested = 'All';
  isLoading: Boolean = false;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  role: string | null = '';

  constructor(private mongodbService: MongodbService,
              private dialog: MatDialog, 
              private toastr: ToastrService) {
                this.role = localStorage.getItem('user_role');
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
      course: this.selectedCourseNotInterested|| '',
    };
    this.mongodbService.getNotInterested(this.currentPage, this.limit, searchTerm,filters).subscribe(
      (response:NotInterestedStudentResponse) => {
        this.isLoading = false;
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.notInterestedStudents = data;
        this.totalRecords = totalRecords;
        this.filteredNotInterested.data = this.notInterestedStudents;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching not interested students:', error);
      }
    );
  }
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudents();
  }
  
  refreshData(){
    this.notInterestedStudents = [];
    this.filteredNotInterested.data = [];
    this.selectedCourseNotInterested = '';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  onCourseChange() {
    this.fetchStudents();
    this.currentPage = 1;
    this.filteredNotInterested.paginator = this.paginator;
  }

  editNotInterestedStudent(student:any){
    const dialogRef = this.dialog.open(EditNotintrestedStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw', 
    minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.notInterestedStudents .findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.notInterestedStudents[index] = result;
          this.fetchStudents();
          this.mongodbService.booleanSubject.next(true);
        } 
      }
    });
  }

  applyFilterNotInterested(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudents(filterValue); 
  }
  
  deleteStudent(student:any){
    this.mongodbService.deleteNotinterestedStudent(student._id).subscribe(
      () => {
          this.toastr.success('Not Interested Student deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudents(); 
      },
      (error) => {
        console.error('Error deleting Not Interested Student:', error);
        this.toastr.error('Error deleting Not Interested Student. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }

  onSendEmail(student:any) {
    const notInterestedId = student._id; 
    this.mongodbService.sendNotInterestedEmail(notInterestedId).subscribe(
      (response) => {
        this.toastr.success('Email sent successfully');
      },
      (error) => {
        this.toastr.error('Error sending email');
      }
    );
  }
}
