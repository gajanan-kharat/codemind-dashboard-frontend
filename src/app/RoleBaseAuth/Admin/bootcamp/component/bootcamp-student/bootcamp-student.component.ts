import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DISPLAYED_COLUMNSBOOTCAMP, PAYMENT_STATUS, SOURCE_STATUS } from 'src/app/models/admin-content';
import { EditBootcampStudentComponent } from '../../dialogs/edit-bootcamp-student/edit-bootcamp-student.component';
import { ToastrService } from 'ngx-toastr';
import { BootcampService } from 'src/app/services/bootcamp.service';

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

  displayedColumnsBootcamp: string[] = DISPLAYED_COLUMNSBOOTCAMP;
  payment_status: string[] = ["All", ...PAYMENT_STATUS];
  source_status: string[] = SOURCE_STATUS;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;
  role: string | null = '';

  selectedPaymentBootCamp = 'All';
  selectedSourceBootCamp = '';
  constructor(private dialog: MatDialog,
              private toastr: ToastrService,
              private bootcampService: BootcampService) {
              this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
    this.filteredBootCamp.sort = this.sort;
  }

  fetchStudents(searchTerm: string = ''): void {
    const filters = {
      paymentStatus: this.selectedPaymentBootCamp || '',
      source: this.selectedSourceBootCamp || ''
    };
    this.bootcampService.getBootCamp(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: any) => {
        const { totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.bootCampStudents = data;
        this.totalRecords = totalRecords;
        this.filteredBootCamp.data = this.bootCampStudents;
      },
      (error) => {
        console.error('Error fetching bootcamp students:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchStudents();
  }

  refreshData() {
    this.bootCampStudents = [];
    this.filteredBootCamp.data = [];
    this.selectedPaymentBootCamp = '';
    this.selectedSourceBootCamp = '';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  onCourseChange() {
    this.currentPage = 1;
    this.fetchStudents();
    this.filteredBootCamp.paginator = this.paginator;
  }

  onSourceChange() {
    this.currentPage = 1;
    this.fetchStudents();
    this.filteredBootCamp.paginator = this.paginator;
  }

  applyFilterBootcamp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudents(filterValue);
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
          this.fetchStudents();
          this.bootcampService.booleanSubject.next(true);
        }
      }
    });
  }

  deleteStudent(student: any) {
    this.bootcampService.deleteBootcampStudent(student._id).subscribe(
      () => {
        this.toastr.success('Bootcamp Student deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudents();
      },
      (error) => {
        console.error('Error deleting Bootcamp Student:', error);
        this.toastr.error('Error deleting Bootcamp Student. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }
}
