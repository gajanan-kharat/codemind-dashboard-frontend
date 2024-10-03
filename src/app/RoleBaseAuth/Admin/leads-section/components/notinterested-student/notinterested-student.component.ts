import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BATCHES, COURSES, DISPLAYED_COLUMNS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditNotintrestedStudentComponent } from '../../dialogs/edit-notintrested-student/edit-notintrested-student.component';

@Component({
  selector: 'app-notinterested-student',
  templateUrl: './notinterested-student.component.html',
  styleUrls: ['./notinterested-student.component.scss']
})
export class NotinterestedStudentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  filteredNotInterested = new MatTableDataSource<any>();
  notInterestedStudents: any[] =[];

  displayedColumns: string[] = DISPLAYED_COLUMNS;

  courses: string[] = COURSES; 
  batches: string[] = BATCHES;

  selectedCourseNotInterested = '';
  selectedBatchNotInterested = '';

  constructor(private mongodbService: MongodbService, private dialog: MatDialog, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
    this.filteredNotInterested.paginator = this.paginator;
    this.filteredNotInterested.sort = this.sort; 
  }

  fetchStudents(): void {
    this.mongodbService.getNotInterested().subscribe(
      (data) => {
        this.notInterestedStudents = data;
        // this.notInterestedDataLength =  this.notInterestedStudents.length;
        this.filterNotInterested() 
        console.log("Not Interested Data :=>", this.notInterestedStudents);
        // console.log("Not Interested Data Length :=>", this.notInterestedDataLength);
      },
      (error) => {
        console.error('Error fetching follow-up students:', error);
      }
    );
  }

  filterNotInterested() {
    this.filteredNotInterested.data = this.notInterestedStudents.filter(student => {
      return (!this.selectedCourseNotInterested || student.course === this.selectedCourseNotInterested);
      // && (!this.selectedBatchNotInterested || student.batch === this.selectedBatchNotInterested);
    });
    if (this.filteredNotInterested.paginator) {
      this.filteredNotInterested.paginator.firstPage();
    }
    // Update paginator if needed
    // this.filteredNotInterested.paginator = this.paginator;
  }

  onBatchChange() {
    this.filterNotInterested(); 
  }

  onCourseChange() {
    this.filterNotInterested();
  }

  editNotInterestedStudent(student:any){
    const dialogRef = this.dialog.open(EditNotintrestedStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw', 
    minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
       
          const index = this.notInterestedStudents .findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.notInterestedStudents[index] = result;
            this.filterNotInterested();
            this.fetchStudents();
          }
        
      }
    });
  }

  applyFilterNotInterested(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredNotInterested.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredNotInterested.paginator) {
      this. filteredNotInterested.paginator.firstPage();
    }
  }

}
