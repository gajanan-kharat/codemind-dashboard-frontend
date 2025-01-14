import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { COURSES } from 'src/app/models/admin-content';
import { HireusService } from 'src/app/services/hireus.service';
import { HireUsResponse } from 'src/app/models/hireFromUs/hireus';
import { EditCompanyLeadsComponent } from '../../dialogs/edit-company-leads/edit-company-leads.component';

@Component({
  selector: 'app-new-company-leads',
  templateUrl: './new-company-leads.component.html',
  styleUrls: ['./new-company-leads.component.scss']
})
export class NewCompanyLeadsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  filteredLeads = new MatTableDataSource<any>();

  student: any[] = [];
  Inquirystudents: any[] = [];

  courses: string[] = ['All',...COURSES]; 
  displayedColumns: string[] = ["name","company","email","mobileNumber","actions"];

  selectedCourseLeads = 'All';

  isLoading:Boolean = false;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  role: string | null = '';

  constructor(private hireusService: HireusService, 
              private dialog: MatDialog,
              private toastr: ToastrService){
    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.fetchStudents();
  }
  
  ngAfterViewInit() {
    this.filteredLeads.sort = this.sort; 
  }

  fetchStudents(searchTerm: string = ''): void {
    this.isLoading =  true;
    const filters = {
      course: this.selectedCourseLeads || '',
    };
    this.hireusService.getHireUs(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response:  HireUsResponse) => {
        this.isLoading =  false;
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.Inquirystudents = data;
        this.totalRecords = totalRecords;
        this.filteredLeads.data =  this.Inquirystudents;
      },
      (error) => {
        this.isLoading =  false;
        console.error('Error fetching new company leads:', error);
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
      this.currentPage = 1;
      this.filteredLeads.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(EditCompanyLeadsComponent, {
      width: '50%',
      data: {}, 
      maxWidth: '80vw',
      minWidth: '280px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Inquirystudents.push(result);
        this.fetchStudents(); 
        this.hireusService.booleanSubject.next(true);
      }
    });
  }
  
 
  editStudent(student: any) {
    const dialogRef = this.dialog.open(EditCompanyLeadsComponent, {
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
            this.hireusService.booleanSubject.next(true);
          }
      }
    });
  }

  deleteHireUs(student:any){
   this.hireusService.deleteHireUs(student.id).subscribe(
      () => {
          this.toastr.success('HireUs deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchStudents(); 
      },
      (error) => {
        console.error('Error deleting HireUs:', error);
        this.toastr.error('Error deleting HireUs. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }


}
