import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COURSES, DISPLAYED_COLUMNSFOLLOW } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditInterestedStudentComponent } from '../../dialogs/edit-interested-student/edit-interested-student.component';

@Component({
  selector: 'app-interested-student',
  templateUrl: './interested-student.component.html',
  styleUrls: ['./interested-student.component.scss']
})
export class InterestedStudentComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
 
  
  filteredInterested = new MatTableDataSource<any>();

  interestedStudents: any[] =[];


  selectedCourseInterested = '';
  courses: string[] = COURSES; 
  displayedColumnsFollow:string[] = DISPLAYED_COLUMNSFOLLOW;
  dateRangeForm: FormGroup;



  constructor(private mongodbService: MongodbService,private dialog: MatDialog, private fb: FormBuilder){
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: ['']
    });
}
  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
    this.filteredInterested.paginator = this.paginator;
    this.filteredInterested.sort = this.sort; 
  }

  fetchStudents(): void {
    this.mongodbService.getInterested().subscribe(
      (data) => {
        this.interestedStudents = data;
        // this.interestedDataLength =  this.interestedStudents.length;

        this.filterInterested() 
        console.log("Interested Student :=> ", this.interestedStudents);
        // this.InquiryDataLength=this.Inquirystudents.length;
        // this.filterLeads();
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  
  filterInterested() {
      this.filteredInterested.data = this.interestedStudents.filter(student => {
      return (!this.selectedCourseInterested || student.course === this.selectedCourseInterested);
      // && (!this.selectedBatchNotInterested || student.batch === this.selectedBatchNotInterested);
    });
    if (this.filteredInterested.paginator) {
      this.filteredInterested.paginator.firstPage();
    }

  }

  onCourseChange() {
    this.filterInterested();
  }

  editInterestedStudent(student:any){
    const dialogRef = this.dialog.open(EditInterestedStudentComponent , {
      width: '50%',
      data: { student },
      maxWidth: '80vw', 
    minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          const index = this.interestedStudents .findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.interestedStudents[index] = result;
            this.filterInterested();
            this.fetchStudents();
          }      
      }
    });
  
  }
  
    applyFilterInterested(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.filteredInterested.filter = filterValue.trim().toLowerCase();
    
      if (this.filteredInterested.paginator) {
        this. filteredInterested.paginator.firstPage();
      }
    }
}
