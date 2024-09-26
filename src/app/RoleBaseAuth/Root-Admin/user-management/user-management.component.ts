import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TOP_ITEMS, BATCHES, DISPLAYED_COLUMNSUSERS, TOP_ROLES } from 'src/app/models/admin-content';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';

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

  selectedRole = ''; 
  searchTerm: string = '';



  constructor(private authService: AuthService, private moongodb: MongodbService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filterUsers();  
    this.fetchUsers(); 
  }

  ngAfterViewInit() {
    this.filteredUsers.paginator = this.paginator;
    this.filteredUsers.sort = this.sort; 
  }

  filterUsers() {  
    if (this.selectedRole) {
      this.filteredUsers.data = this.users.filter(user => user.role === this.selectedRole);  
    } else {
      this.filteredUsers.data = this.users;  
    }
  }

  fetchUsers(): void {  
    this.authService.getUser().subscribe(
      (data) => {
        this.users = data;  
        this.dataSource.data = this.users;  
        this.filterUsers();  
      },
      (error) => {
        console.error('Error fetching users:', error);  
      }
    );
  }

  refreshData(): void {
    this.fetchUsers(); 
    this.selectedRole = ''; 
    this.filterUsers(); 
    this.searchTerm = '';  
    this.filteredUsers.filter = '';  

    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
        searchInput.value = ''; 
    }

    if (this.filteredUsers.paginator) {
        this.filteredUsers.paginator.firstPage();  
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredUsers.filter = filterValue.trim().toLowerCase();  
  
    if (this.filteredUsers.paginator) {
      this.filteredUsers.paginator.firstPage();  
    }
 
  }

  onRoleClick(role: string) {
    this.selectedRole = role;  
    this.filterUsers();       
  }

  addNewUser() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '50%',
      data: { user: null }  
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.users.push(result);  
        this.filterUsers();  
      }
    });
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
          this.filterUsers(); 
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
