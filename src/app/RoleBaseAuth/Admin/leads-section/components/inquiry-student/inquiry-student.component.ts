import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COURSES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditInquiryStudentComponent } from '../../dialogs/edit-inquiry-student/edit-inquiry-student.component';
import { InquiryStudentResponse } from 'src/app/models/inquiryStudents';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inquiry-student',
  templateUrl: './inquiry-student.component.html',
  styleUrls: ['./inquiry-student.component.scss']
})
export class InquiryStudentComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  filteredLeads = new MatTableDataSource<any>();

  student: any[] = [];
  Inquirystudents: any[] = [];

  courses: string[] = ['All',...COURSES]; 
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  isLoading:Boolean = false; 
  selectedCourseLeads = 'All';

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  role: string | null = '';

  constructor(private mongodbService: MongodbService, private dialog: MatDialog,private toastr: ToastrService){
    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchStudents();
  }
  
  ngAfterViewInit() {
    this.filteredLeads.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    this.isLoading = true;
    const filters = {
      course: this.selectedCourseLeads || '',
    };
    this.mongodbService.getInquiryStudent(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: InquiryStudentResponse) => {
        this.isLoading = false;
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.Inquirystudents = data;
        this.totalRecords = totalRecords;
        this.filteredLeads.data =  this.Inquirystudents;
        // this.filterLeads();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching students:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudents();
  }
  
  onCourseChange() {
      this.fetchStudents();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
      this.currentPage = 1;
      this.fetchStudents(filterValue); 
  }

  refreshData(){
    this.Inquirystudents = [];
    this.filteredLeads.data = [];
    this.selectedCourseLeads = 'All';
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchStudents();
  }

  addNewStudent(): void {
    const dialogRef = this.dialog.open(EditInquiryStudentComponent, {
      width: '50%',
      data: {}, 
      maxWidth: '80vw',
      minWidth: '280px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Inquirystudents.push(result);
        this.fetchStudents(); 
        this.mongodbService.booleanSubject.next(true);
      }
    });
  }
  
 
  editStudent(student: any) {
    // console.log("Student data =>", student);
    const dialogRef = this.dialog.open(EditInquiryStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw', 
    minWidth: '280px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          const index = this.Inquirystudents.findIndex(s => s.id === student.id);
          if (index !== -1) {
            this.Inquirystudents[index] = result;
            this.fetchStudents();
            this.mongodbService.booleanSubject.next(true);
          }
      }
    });
  }

  deleteInquiryStudent(student:any){
    this.mongodbService.deleteStudent(student.id).subscribe(
      () => {
          this.toastr.success('Inquiry Student deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudents(); 
      },
      (error) => {
        console.error('Error deleting Inquiry Student:', error);
        this.toastr.error('Error deleting Inquiry Student. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }


}
