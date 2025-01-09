import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DISPLAYED_COLUMNS_CODEMINDBOOTCAMP, SOURCE_STATUS } from 'src/app/models/admin-content';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { EditCodemindBootcampComponent } from '../../dialogs/edit-codemind-bootcamp/edit-codemind-bootcamp.component';

@Component({
  selector: 'app-codemind-bootcamp',
  templateUrl: './codemind-bootcamp.component.html',
  styleUrls: ['./codemind-bootcamp.component.scss']
})
export class CodemindBootcampComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredBootCamp = new MatTableDataSource<any>();
  bootCampStudents: any[] = [];

  displayedColumnsBootcamp: string[] = DISPLAYED_COLUMNS_CODEMINDBOOTCAMP;
  source_status: string[] = SOURCE_STATUS;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;
  role: string | null = '';
  isLoading:Boolean = false;

  selectedSourceBootCamp = '';
  constructor(private dialog: MatDialog,
    private toastr: ToastrService,
    private bootcampService: BootcampService) {
    this.role = sessionStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
    this.filteredBootCamp.sort = this.sort;
  }

  fetchStudents(searchTerm: string = ''): void {
    this.isLoading = true;
    const filters = {
      selectedBootcamp: this.selectedSourceBootCamp || ''

    };
    this.bootcampService.getCodemindBootCamp(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: any) => {
        this.isLoading = false;
        const { totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.bootCampStudents = data;
        this.totalRecords = totalRecords;
        this.filteredBootCamp.data = this.bootCampStudents;
      },
      (error) => {
        this.isLoading = false;
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
    this.selectedSourceBootCamp = '';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
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
    const dialogRef = this.dialog.open(EditCodemindBootcampComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw',
      minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.bootCampStudents.findIndex(s => s.id === student.id);
        if (index !== -1) {
          this.bootCampStudents[index] = result;
          this.fetchStudents();
          this.bootcampService.booleanSubject.next(true);
        }
      }
    });
  }

  deleteStudent(student: any) {
    this.bootcampService.deleteCodemindBootcampStudent(student.id).subscribe(
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

  //send email
  onSendEmail(student: any) {
    const codemindBootcampId = student.id;
    this.bootcampService.sendcodemindBootcampEmail(codemindBootcampId).subscribe(
      (response) => {
        this.toastr.success('Email sent successfully');
      },
      (error) => {
        this.toastr.error('Error sending email');
      }
    );
  }
}
