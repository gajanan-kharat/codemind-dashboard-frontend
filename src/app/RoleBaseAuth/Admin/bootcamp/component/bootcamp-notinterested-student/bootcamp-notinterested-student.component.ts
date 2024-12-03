import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DISPLAYED_COLUMNS, COURSES } from 'src/app/models/admin-content';
import { NotInterestedStudentResponse } from 'src/app/models/notInterestedStudents';
import { EditBootcampNotinterestedStudentComponent } from '../../dialogs/edit-bootcamp-notinterested-student/edit-bootcamp-notinterested-student.component';
import { BootcampService } from 'src/app/services/bootcamp.service';

@Component({
  selector: 'app-bootcamp-notinterested-student',
  templateUrl: './bootcamp-notinterested-student.component.html',
  styleUrls: ['./bootcamp-notinterested-student.component.scss']
})
export class BootcampNotinterestedStudentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filteredNotInterested = new MatTableDataSource<any>();
  notInterestedStudents: any[] = [];

  displayedColumns: string[] = DISPLAYED_COLUMNS;

  courses: string[] = ["All", ...COURSES];

  selectedCourseNotInterested = 'All';
  
  isLoading:Boolean = false;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;
  role: string | null = '';

  constructor(private dialog: MatDialog,
    private toastr: ToastrService,
    private bootcampService: BootcampService) {
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
      course: this.selectedCourseNotInterested || '',
    };
    this.bootcampService.getBootcampNotInterested(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: NotInterestedStudentResponse) => {
        this.isLoading = false;
        const { totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.notInterestedStudents = data;
        this.totalRecords = totalRecords;
        this.filteredNotInterested.data = this.notInterestedStudents;
      },
      (error) => {
        console.error('Error fetching follow-up students:', error);
      }
    );
  }
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchStudents();
  }

  refreshData() {
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

  applyFilterNotInterested(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudents(filterValue); 
  }

  editNotInterestedStudent(student: any) {
    const dialogRef = this.dialog.open(EditBootcampNotinterestedStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw',
      minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.notInterestedStudents.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.notInterestedStudents[index] = result;
          this.fetchStudents();
          this.bootcampService.booleanSubject.next(true);
        }
      }
    });
  }

  deleteStudent(student: any) {
    this.bootcampService.deleteBootcampNotinterestedStudent(student._id).subscribe(
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

  onSendEmail(student: any) {
    const notInterestedId = student._id;
    this.bootcampService.sendNotInterestedEmail(notInterestedId).subscribe(
      (response) => {
        this.toastr.success('Email sent successfully');
      },
      (error) => {
        this.toastr.error('Error sending email');
      }
    );
  }
}
