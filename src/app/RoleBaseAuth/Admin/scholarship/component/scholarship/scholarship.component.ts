import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { COLLEGE_ITEMS, UNIVERSITY, DISTRICT, SCHOLARSHIP_ITEMS } from 'src/app/models/admin-content';
import { CollegeDataResponse } from 'src/app/models/collegeData/collegeInfo';
import { EditCollegeInfoComponent } from '../../../collegeData-section/dialogs/edit-college-info/edit-college-info.component';
import { ScholarshipService } from 'src/app/services/scholarship.service';
import { ScholarshipDataResponse } from 'src/app/models/scholrshipData/scholarship';
import { EditScholarshipComponent } from '../../dialogs/edit-scholarship/edit-scholarship.component';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.scss']
})
export class ScholarshipComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  
  
  filteredScholarshipData = new MatTableDataSource<any>();
  role: string | null = '';
  scholarshipInfo: any[] = [];

  topItems = SCHOLARSHIP_ITEMS;   
 // University = UNIVERSITY;
  //District = DISTRICT;
  displayedColumns: string[] = ['name','email','mobileNumber','status','Actions'];
  
  //selectedUniversity = 'All';
  selectedName = '';
  //selectedDistrictStatus : string = 'All'; 

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;

  /*startDate: Date | null = null;
  endDate: Date | null = null;*/
  
  constructor(  private scholarshipService:  ScholarshipService, 
               private dialog: MatDialog,
               private toastr: ToastrService) {

    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchCollegeData(); 
  }

  ngAfterViewInit() {
    this.filteredScholarshipData .sort = this.sort; 
  }
    
  
    /*onDistrictChange() {
      this.currentPage = 1;
      this.fetchCollegeData();
      this.filteredCollegeData.paginator = this.paginator;
 
    }*/
  
    onClick(name: string) {
      this.selectedName = name;
      this.currentPage = 1;
      this.fetchCollegeData();
      this. filteredScholarshipData.paginator = this.paginator;
    
    }
  
    /*onUniversityChange() {
      this.fetchCollegeData();
      this.currentPage = 1;
      this.filteredCollegeData.paginator = this.paginator;
    }

    onDateChange(): void {
      this.currentPage = 1;
      this.fetchCollegeData();
      this.filteredCollegeData.paginator = this.paginator;
    }*/

  fetchCollegeData(searchTerm: string = ''): void {
     const filters = {
      scholarshipStatus: this.selectedName || '',
       /*universityName:  this.selectedUniversity || '',
       visitedStatus: this.selectedName || '',
       district: this.selectedDistrictStatus  || '',
       startDate: this.startDate ? this.startDate.toISOString() : '',
       endDate: this.endDate ? this.endDate.toISOString() : ''*/
    };
    this.scholarshipService.getScholarshipData(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: ScholarshipDataResponse) => {
        console.log("scholarship:=>",response);
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.scholarshipInfo = data;
        this.totalRecords = totalRecords;
        this.filteredScholarshipData .data = this.scholarshipInfo;
   
      },
      (error) => {
        console.error('Error fetching students Mock:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchCollegeData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchCollegeData(filterValue); 
  }

  refreshData(){
    this.scholarshipInfo= [];
    this.filteredScholarshipData.data = [];
    this.selectedName = '';
    /*this.selectedDistrictStatus = 'All'; 
    this.selectedUniversity  = 'All';
    this.startDate = null;
    this.endDate = null;*/
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this. fetchCollegeData();
  }
 
  editStudent(student: any) {
    const dialogRef = this.dialog.open(EditScholarshipComponent, {
      width: '80%',
      data: { student },
      maxWidth: '80vw', 
      minWidth: '300px',
    });
  //  console.log("scholarship:=>",student);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.scholarshipInfo.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.scholarshipInfo[index] = result;
          this.fetchCollegeData();
        }
      }
    });
  }

  deleteScholarship(scholarship:any){
    this.scholarshipService.deleteScholarshipData(scholarship._id).subscribe(
      () => {
          this.toastr.success('scholarship Data deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchCollegeData();
      },
      (error) => {
        console.error('Error deleting scholarship Data :', error);
        this.toastr.error('Error deleting scholarship Data . Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }

  addNewStudent(){
    const dialogRef = this.dialog.open(EditScholarshipComponent, {
      width: '50%',
      data: { scholarship:null }, 
      // maxWidth: '80vw',
      // minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scholarshipInfo.push(result);
        this.fetchCollegeData();
      }
    });
  }

}
