import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BATCHES, DISPLAYED_COLUMNSUSERS, TOP_ROLES } from 'src/app/models/admin-content';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditUserDialogComponent } from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import { UsersResponse } from 'src/app/models/adminUsers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  

  filteredUsers = new MatTableDataSource<any>();  
  users: any[] = [];  
  dataSource = new MatTableDataSource<any>(this.users); 

  topItems = TOP_ROLES;      
  batches:string[] =  BATCHES; 
  displayedColumnsUsers:string[] =  DISPLAYED_COLUMNSUSERS;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;
  isLoading:Boolean = false;

  selectedRole = ''; 

  constructor(private authService: AuthService,
     private moongodb: MongodbService,
     private dialog: MatDialog,
     private toastr: ToastrService) {}
  ngOnInit(): void { 
    this.fetchUsers();
  }

  ngAfterViewInit() {
    this.filteredUsers.sort = this.sort; 
  }

  fetchUsers(searchTerm: string = ''): void { 
    this.isLoading = true; 
    const filters = {
     role: this.selectedRole || '',
    };
    this.authService.getUser(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response:UsersResponse) => {
        this.isLoading = false; 
        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.users = data;
        this.totalRecords = totalRecords;
        this.filteredUsers.data = this.users;
      },
      (error) => {
        console.error('Error fetching users:', error);  
      }
    );
  }
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchUsers();
  }

  refreshData(): void {
    this.users = [];
    this.selectedRole = ''; 
    this.filteredUsers.data= [];  
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchUsers(filterValue); 
  }

  onRoleClick(role: string) {
    this.selectedRole = role;  
    this.fetchUsers();   
  }

  addNewUser() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '50%',
      data: { user: null }  
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.users.push(result); 
        this.fetchUsers(); 
      }
    });
  }

  deleteUser(user:any){
     this.authService.deleteUsers(user._id).subscribe(
        () => {
            this.toastr.success('User deleted successfully.', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          this.fetchUsers();
        },
        (error) => {
          console.error('Error creating user:', error);
          this.toastr.error('Error deleting user. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          })
        }
      );
  }
 
  editUser(user: any) {  
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '50%',
      data: { user }  
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.users.findIndex(u => u._id === user._id);  
        if (index !== -1) {
          this.users[index] = result;
          this.fetchUsers();  
        }
      }
    });
  } 
  
  downloadReport() {
    const reportData = this.filteredUsers.filteredData;
    this.moongodb.generateUsersReport(reportData).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'user-report.pdf';
      link.click();
      window.open(url);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error generating report:', error);
      alert('Something went wrong while generating the report. Please try again later.');
    });
  }
}
