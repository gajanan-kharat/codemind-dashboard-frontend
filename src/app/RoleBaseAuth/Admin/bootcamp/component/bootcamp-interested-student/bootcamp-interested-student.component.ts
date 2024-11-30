import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { COURSES, DISPLAYED_COLUMNSFOLLOW } from 'src/app/models/admin-content';
import { InterestedStudentResponse } from 'src/app/models/interestedStudents';
import { MongodbService } from 'src/app/services/mongodb.service';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { EditBootcampInterestedStudentComponent } from '../../dialogs/edit-bootcamp-interested-student/edit-bootcamp-interested-student.component';

@Component({
  selector: 'app-bootcamp-interested-student',
  templateUrl: './bootcamp-interested-student.component.html',
  styleUrls: ['./bootcamp-interested-student.component.scss']
})
export class BootcampInterestedStudentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredInterested = new MatTableDataSource<any>();
  interestedStudents: any[] = [];

  selectedCourseInterested = 'All';
  courses: string[] = ["All", ...COURSES];
  displayedColumnsFollow: string[] = DISPLAYED_COLUMNSFOLLOW;

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
    this.filteredInterested.sort = this.sort;
  }

  fetchStudents(searchTerm: string = ''): void {
    const filters = {
      course: this.selectedCourseInterested || '',
    };
    this.bootcampService.getBootcampInterested(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: InterestedStudentResponse) => {
        const { totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.interestedStudents = data;
        this.totalRecords = totalRecords;
        this.filteredInterested.data = this.interestedStudents;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  onCourseChange() {
    this.fetchStudents();
    this.currentPage = 1;
    this.filteredInterested.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchStudents();
  }

  refreshData() {
    this.interestedStudents = [];
    this.filteredInterested.data = [];
    this.selectedCourseInterested = '';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  applyFilterInterested(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudents(filterValue);
  }

  editInterestedStudent(student: any) {
    const dialogRef = this.dialog.open(EditBootcampInterestedStudentComponent, {
      width: '80%',
      data: { student },
      maxWidth: '80vw',
      minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.interestedStudents.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.interestedStudents[index] = result;
          this.fetchStudents();
          this.bootcampService.booleanSubject.next(true);
        }
      }
    });
  }

  deleteStudent(student: any) {
    this.bootcampService.deleteBootcampInterestedStudent(student._id).subscribe(
      () => {
        this.toastr.success('Interested Student deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudents();
      },
      (error) => {
        console.error('Error deleting Interested Student:', error);
        this.toastr.error('Error deleting Interested Student. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }
}
