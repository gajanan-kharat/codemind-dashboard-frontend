import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TOP_ITEMS, BATCHES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  /*displayedColumns: string[] = ['name', 'email', 'course', 'actions'];
  dataSource = new MatTableDataSource<any>(); // Adjust type as needed
  filteredStudents: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedBatch = 'All';
  selectedCourse = '';
  searchTerm: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.authService.getUser().subscribe(
      (data) => {
        this.filteredStudents = data; // Set initial data
        this.dataSource.data = this.filteredStudents;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  
 filterStudents() {
  if (this.selectedBatch === 'All') {
    this.filteredStudents.data = this.selectedCourse 
      ? this.students.filter(student => student.course === this.selectedCourse)
      : this.students;
  } else {
    this.filteredStudents.data = this.selectedCourse 
      ? this.students.filter(student => student.batch === this.selectedBatch && student.course === this.selectedCourse)
      : this.students.filter(student => student.batch === this.selectedBatch);
  }
  // this.filteredStudents.paginator = this.paginator;
}

  onCourseClick(course: string) {
    this.selectedCourse = course;
    this.filterStudents();
  }


  editStudent(student: any) {
    // Implement edit logic
    console.log('Edit student:', student);
  }*/

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;  
    filteredStudents = new MatTableDataSource<any>();
    students: any[] = [];
    dataSource = new MatTableDataSource<any>(this.students);
    
    topItems = TOP_ITEMS;   
    batches:string[] =  BATCHES; 
    displayedColumns: string[] = DISPLAYED_COLUMNS;
  
    selectedBatch = 'All';
    selectedCourse = '';
    searchTerm: string = '';
  
    constructor(private authService: AuthService, private moongodb: MongodbService,  private dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.filterStudents();
      this.fetchStudents();
    }
    ngAfterViewInit() {
      this.filteredStudents.paginator = this.paginator;
      this.filteredStudents.sort = this.sort; 
    }
  
   filterStudents() {
    if (this.selectedBatch === 'All') {
      this.filteredStudents.data = this.selectedCourse 
        ? this.students.filter(student => student.course === this.selectedCourse)
        : this.students;
    } else {
      this.filteredStudents.data = this.selectedCourse 
        ? this.students.filter(student => student.batch === this.selectedBatch && student.course === this.selectedCourse)
        : this.students.filter(student => student.batch === this.selectedBatch);
    }
    // this.filteredStudents.paginator = this.paginator;
  }
  
    fetchStudents(): void {
      this.authService.getUser().subscribe(
        (data) => {
          this.students = data;
          this.dataSource.data = this.students;
          this.filterStudents(); 
          console.log('users data: ', this.students);
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.filteredStudents.filter = filterValue.trim().toLowerCase();
    
      if (this.filteredStudents.paginator) {
        this.filteredStudents.paginator.firstPage();
      }
    }
    
  
    onCourseClick(course: string) {
      this.selectedCourse = course;
      this.filterStudents();
    }
  
    // onBatchChange() {
    //   this.filterStudents();
    // }
   
    editStudent(student: any) {
      const dialogRef = this.dialog.open(EditUserDialogComponent, {
        width: '50%',
        data: { student }
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          const index = this.students.findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.students[index] = result;
            this.filterStudents();
          }
        }
      });
    }    
}
