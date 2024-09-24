import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentDialogComponent } from '../dialogs/edit-student-dialog/edit-student-dialog.component';
import { TOP_ITEMS, BATCHES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent implements OnInit {
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
    this.moongodb.getStudent().subscribe(
      (data) => {
        this.students = data;
        this.dataSource.data = this.students;
        this.filterStudents(); 
        console.log('student data: ', this.students);
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

  onBatchChange() {
    this.filterStudents();
  }
 
  editStudent(student: any) {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '100%',
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

