import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TOP_ITEMS, BATCHES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentmockDialogComponent } from '../dialogs/edit-studentmock-dialog/edit-studentmock-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-student-mock-content',
  templateUrl: './student-mock-content.component.html',
  styleUrls: ['./student-mock-content.component.scss']
})
export class StudentMockContentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredStudentsMock = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;  
  studentsMock: any[] = [];
  dataSource = new MatTableDataSource<any>(this.studentsMock);
  
  topItems = TOP_ITEMS;   
  batches:string[] =  BATCHES; 
  displayedColumns: string[] = DISPLAYED_COLUMNS;

  selectedBatch = 'All';
  selectedCourse = '';

  constructor(private authService: AuthService, private moongodb: MongodbService,  private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filterStudentsMock();
    this.fetchStudentsMock();
  }

  ngAfterViewInit() {
    this.filteredStudentsMock.paginator = this.paginator;
    this.filteredStudentsMock.sort = this.sort; 
  }

  filterStudentsMock() {
    if (this.selectedBatch === 'All') {
      this.filteredStudentsMock.data = this.selectedCourse 
        ? this.studentsMock.filter(student => student.course === this.selectedCourse)
        : this.studentsMock;
    } else {
      this.filteredStudentsMock.data = this.selectedCourse 
        ? this.studentsMock.filter(student => student.batch === this.selectedBatch && student.course === this.selectedCourse)
        : this.studentsMock.filter(student => student.batch === this.selectedBatch);
    }
  }

  fetchStudentsMock(): void {
    this.moongodb.getStudentMock().subscribe(
      (data) => {
        this.studentsMock = data;
        this.dataSource.data = this.studentsMock;
        this.filterStudentsMock(); 
        console.log('student Mock data: ', this.studentsMock);
      },
      (error) => {
        console.error('Error fetching students Mock:', error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredStudentsMock.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredStudentsMock.paginator) {
      this.filteredStudentsMock.paginator.firstPage();
    }
  }
  

  onCourseClick(course: string) {
    this.selectedCourse = course;
    this.filterStudentsMock();
  }

  onBatchChange() {
    this.filterStudentsMock();
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
          this.filterStudentsMock();
        }
      }
    });
  }

}