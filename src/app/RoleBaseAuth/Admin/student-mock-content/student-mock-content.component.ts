import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TOP_ITEMS, BATCHES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentmockDialogComponent } from '../dialogs/edit-studentmock-dialog/edit-studentmock-dialog.component';
import { MatSort } from '@angular/material/sort';
import { StudentMockResponse } from 'src/app/models/studentMockInformation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-mock-content',
  templateUrl: './student-mock-content.component.html',
  styleUrls: ['./student-mock-content.component.scss']
})
export class StudentMockContentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  
  
  studentsMock: any[] = [];
  filteredStudentsMock = new MatTableDataSource<any>();
  role: string | null = '';

  topItems = TOP_ITEMS;   
  batches:string[] =  ['All',...BATCHES]; 
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  mockStatusOptions: string[] = ['All','Pending', 'Excellent', 'Good', 'Average', 'Poor'];
  mockNumbers: { value: number, label: string }[] = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Mock 1' },
    { value: 2, label: 'Mock 2' },
    { value: 3, label: 'Mock 3' },
    { value: 4, label: 'Mock 4' }
  ];

  selectedBatch = 'All';
  selectedCourse = '';

  selectedMockNumber: number = 0;  
  selectedMockStatus: string = 'All'; 

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  
  constructor( private moongodb: MongodbService,  
               private dialog: MatDialog,
               private toastr: ToastrService) {

    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    //this.filterStudentsMock();
    this.fetchStudentsMock();
   
  }

  ngAfterViewInit() {
    // this.filteredStudentsMock.paginator = this.paginator;
    this.filteredStudentsMock.sort = this.sort; 
  }

  /*filterStudentsMock() {
    if (this.selectedBatch === 'All') {
      this.filteredStudentsMock.data = this.selectedCourse 
        ? this.studentsMock.filter(student => student.course === this.selectedCourse)
        : this.studentsMock;
    } else {
      this.filteredStudentsMock.data = this.selectedCourse 
        ? this.studentsMock.filter(student => student.batch === this.selectedBatch && student.course === this.selectedCourse)
        : this.studentsMock.filter(student => student.batch === this.selectedBatch);
    }
  }*/


    /*filterStudentsMock() {
      this.filteredStudentsMock.data = this.studentsMock.filter(student => {
        let matchesCourse = !this.selectedCourse || student.course === this.selectedCourse;
        let matchesBatch = this.selectedBatch === 'All' || student.batch === this.selectedBatch;
        let matchesMockStatus = true;
    
        if (this.selectedMockStatus === 'Pending') { 
          const mockNumberStr = `Mock-${this.selectedMockNumber}`; 
          matchesMockStatus = !student.mocks || !student.mocks.some((mock: any) => 
            mock.mockNumber === mockNumberStr
          );
        } 
        else if (this.selectedMockNumber > 0 && this.selectedMockStatus) {
          const mockNumberStr = `Mock-${this.selectedMockNumber}`; 
          matchesMockStatus = student.mocks.some((mock: any) => 
            mock.mockNumber === mockNumberStr && mock.mockStatus === this.selectedMockStatus
          );
        }
        return matchesCourse && matchesBatch && matchesMockStatus;
      });
    }*/
    
    onMockNumberChange(mockNumber: number) {
      this.selectedMockNumber = mockNumber;
      this.currentPage = 1;
      this.fetchStudentsMock();
      this.filteredStudentsMock.paginator = this.paginator;
      //this.filterStudentsMock();
    }
  
    onMockStatusChange(status: string) {
      this.selectedMockStatus = status;
      this.currentPage = 1;
      this.fetchStudentsMock();
      this.filteredStudentsMock.paginator = this.paginator;
      //this.filterStudentsMock();
    }
  
    onCourseClick(course: string) {
      this.selectedCourse = course;
      this.currentPage = 1;
      this.fetchStudentsMock();
      this.filteredStudentsMock.paginator = this.paginator;
      //this.filterStudentsMock();
    }
  
    onBatchChange() {
      this.fetchStudentsMock();
      this.currentPage = 1;
      this.filteredStudentsMock.paginator = this.paginator;
      //this.filterStudentsMock();
    }

  fetchStudentsMock(searchTerm: string = ''): void {
     const filters = {
      batch: this.selectedBatch || '',
      course: this.selectedCourse || '',
      mockNumber: this.selectedMockNumber || 0,
      mockStatus: this.selectedMockStatus || ''
    };
    console.log("search teram :=> ",filters.course);
    this.moongodb.getStudentMock(this.currentPage, this.limit, searchTerm,filters).subscribe(
      (response: StudentMockResponse) => {
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.studentsMock = data;
        this.totalRecords = totalRecords;
        this.filteredStudentsMock.data = this.studentsMock;
        console.log("filteredStudentsMock:=>", this.filteredStudentsMock.data);
        //this.filterStudentsMock();      
      },
      (error) => {
        console.error('Error fetching students Mock:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudentsMock();
  }
  
  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredStudentsMock.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredStudentsMock.paginator) {
      this.filteredStudentsMock.paginator.firstPage();
    }
  }*/

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.currentPage = 1;
      this.fetchStudentsMock(filterValue); 
    }

  refreshData(){
    this.studentsMock = [];
    this.filteredStudentsMock.data = [];
    this.selectedMockStatus = '';
    this.selectedMockNumber = 0;
    this.selectedBatch = 'All';
    this.selectedCourse = '';
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudentsMock();
  }
 
  editStudent(student: any) {
    const dialogRef = this.dialog.open(EditStudentmockDialogComponent, {
      width: '100%',
      data: { student }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.studentsMock.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.studentsMock[index] = result;
          //this.filterStudentsMock();
          this.fetchStudentsMock();
        }
      }
    });
  }

  deleteStudentMock(student:any){
    this.moongodb.deleteStudentMock(student._id).subscribe(
      () => {
          this.toastr.success('Student Mock Information deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudentsMock();
      },
      (error) => {
        console.error('Error deleting Student Mock Information:', error);
        this.toastr.error('Error deleting Student Mock Information. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }
}
