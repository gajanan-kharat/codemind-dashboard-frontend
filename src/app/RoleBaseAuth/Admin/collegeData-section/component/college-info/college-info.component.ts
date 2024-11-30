import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { COLLEGE_ITEMS, UNIVERSITY, DISTRICT, DISPLAYED_COLUMNS_COLLEGE } from 'src/app/models/admin-content';
import { EditCollegeInfoComponent } from '../../dialogs/edit-college-info/edit-college-info.component';
import { CollegeDataResponse } from 'src/app/models/collegeData/collegeInfo';
import { CollegeDataService } from 'src/app/services/college-data.service';

@Component({
  selector: 'app-college-info',
  templateUrl: './college-info.component.html',
  styleUrls: ['./college-info.component.scss']
})
export class CollegeInfoComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredCollegeData = new MatTableDataSource<any>();
  role: string | null = '';
  collegeInfo: any[] = [];

  topItems = COLLEGE_ITEMS;
  University = UNIVERSITY;
  District = DISTRICT;
  displayedColumns = DISPLAYED_COLUMNS_COLLEGE;

  selectedUniversity = 'All';
  selectedName = '';
  selectedDistrictStatus: string = 'All';

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;

  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private collegeDataService: CollegeDataService,
    private dialog: MatDialog,
    private toastr: ToastrService) {

    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchCollegeData();
  }

  ngAfterViewInit() {
    this.filteredCollegeData.sort = this.sort;
  }

  onDistrictChange() {
    this.currentPage = 1;
    this.fetchCollegeData();
    this.filteredCollegeData.paginator = this.paginator;

  }

  onClick(name: string) {
    this.selectedName = name;
    this.currentPage = 1;
    this.fetchCollegeData();
    this.filteredCollegeData.paginator = this.paginator;
  }

  onUniversityChange() {
    this.fetchCollegeData();
    this.currentPage = 1;
    this.filteredCollegeData.paginator = this.paginator;
  }

  onDateChange(): void {
    this.currentPage = 1;
    this.fetchCollegeData();
    this.filteredCollegeData.paginator = this.paginator;
  }

  fetchCollegeData(searchTerm: string = ''): void {
    const filters = {
      universityName: this.selectedUniversity || '',
      visitedStatus: this.selectedName || '',
      district: this.selectedDistrictStatus || '',
      startDate: this.startDate ? this.startDate.toISOString() : '',
      endDate: this.endDate ? this.endDate.toISOString() : ''
    };
    this.collegeDataService.getCollegeData(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: CollegeDataResponse) => {
        const { totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.collegeInfo = data;
        this.totalRecords = totalRecords;
        this.filteredCollegeData.data = this.collegeInfo;

      },
      (error) => {
        console.error('Error fetching students Mock:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchCollegeData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchCollegeData(filterValue);
  }

  refreshData() {
    this.collegeInfo = [];
    this.filteredCollegeData.data = [];
    this.selectedDistrictStatus = 'All';
    this.selectedUniversity = 'All';
    this.selectedName = '';
    this.startDate = null;
    this.endDate = null;
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchCollegeData();
  }

  editStudent(college: any) {
    const dialogRef = this.dialog.open(EditCollegeInfoComponent, {
      width: '50%',
      data: { college }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.collegeInfo.findIndex(s => s._id === college._id);
        if (index !== -1) {
          this.collegeInfo[index] = result;
          this.fetchCollegeData();
        }
      }
    });
  }

  deleteStudentMock(college: any) {
    this.collegeDataService.deleteCollgeData(college._id).subscribe(
      () => {
        this.toastr.success('College Data deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchCollegeData();
      },
      (error) => {
        console.error('Error deleting College Data :', error);
        this.toastr.error('Error deleting College Data . Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }

  addNewStudent() {
    const dialogRef = this.dialog.open(EditCollegeInfoComponent, {
      width: '50%',
      data: { college: null },
      // maxWidth: '80vw',
      // minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.collegeInfo.push(result);
        this.fetchCollegeData();
      }
    });
  }
}
