import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DISPLAYED_COLUMNS_INVENTORY, ISSUESTATUS } from 'src/app/models/admin-content';
import { StudentIssueService } from 'src/app/services/student-issue.service';
import { EditNewIssuesComponent } from '../../dialogs/edit-new-issues/edit-new-issues.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-issues',
  templateUrl: './new-issues.component.html',
  styleUrls: ['./new-issues.component.scss']
})
export class NewIssuesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredStudentIssuesData = new MatTableDataSource<any>();
  role: string | null = '';
  studentIssuesInfo: any[] = [];

  topItems = ISSUESTATUS;
  displayedColumns = DISPLAYED_COLUMNS_INVENTORY;
  selectedName = '';

  isLoading: Boolean = false;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;

  constructor(private studentIssueService: StudentIssueService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder) {

    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchStudentIssues();
  }

  ngAfterViewInit() {
    this.filteredStudentIssuesData.sort = this.sort;
  }

  onClick(name: string) {
    this.selectedName = name;
    this.currentPage = 1;
    this.fetchStudentIssues();
    this.filteredStudentIssuesData.paginator = this.paginator;

  }

  fetchStudentIssues(searchTerm: string = ''): void {
    this.isLoading = true;
    const filters = {
      issueStatus: this.selectedName || '',
    };
    this.studentIssueService.getStudentIssuesData(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: any) => {
        this.isLoading = false;
        const { totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.studentIssuesInfo = data;
        this.totalRecords = totalRecords;
        this.filteredStudentIssuesData.data = this.studentIssuesInfo;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching students Mock:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchStudentIssues();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudentIssues(filterValue);
  }

  refreshData() {
    this.studentIssuesInfo = [];
    this.filteredStudentIssuesData.data = [];
    this.selectedName = '';
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudentIssues();
  }

  editStudent(student: any) {
    const dialogRef = this.dialog.open(EditNewIssuesComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw',
      minWidth: '300px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.studentIssuesInfo.findIndex(s => s.id === student.id);
        if (index !== -1) {
          this.studentIssuesInfo[index] = result;
          this.fetchStudentIssues();
        }
      }
    });
  }

  deleteScholarship(student: any) {
    this.studentIssueService.deleteStudentIssuesData(student.id).subscribe(
      () => {
        this.toastr.success('student Issue Data deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudentIssues();
      },
      (error) => {
        console.error('Error deleting student issue Data :', error);
        this.toastr.error('Error deleting student issue Data . Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }

  addNewStudentIssue() {
    const dialogRef = this.dialog.open(EditNewIssuesComponent, {
      width: '50%',
      data: { student: null },
      maxWidth: '80vw',
      minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentIssuesInfo.push(result);
        this.fetchStudentIssues();
      }
    });
  }

}
