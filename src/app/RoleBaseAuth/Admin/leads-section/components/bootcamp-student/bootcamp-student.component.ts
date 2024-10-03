import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DISPLAYED_COLUMNSBOOTCAMP, PAYMENT_STATUS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditBootcampStudentComponent } from '../../dialogs/edit-bootcamp-student/edit-bootcamp-student.component';

@Component({
  selector: 'app-bootcamp-student',
  templateUrl: './bootcamp-student.component.html',
  styleUrls: ['./bootcamp-student.component.scss']
})
export class BootcampStudentComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  filteredBootCamp = new MatTableDataSource<any>();
  bootCampStudents: any[] = [];

  displayedColumnsBootcamp:string[] = DISPLAYED_COLUMNSBOOTCAMP;
  payment_status: string[] = PAYMENT_STATUS; 

  selectedPaymentBootCamp = '';
  constructor(private mongodbService: MongodbService, private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  ngAfterViewInit() {
      this.filteredBootCamp.paginator = this.paginator;
      this.filteredBootCamp.sort = this.sort; 
  }

  fetchStudents(): void {
     // Fetch BootCamp data
     this.mongodbService.getBootCamp().subscribe(
      (data) => {
        this.bootCampStudents = data;
        // this.bootCampDataLength =  this.bootCampStudents.length;
        console.log("Bootcamp Data:=>",this.bootCampStudents);
        // this.bootCampDataLength = this.bootCampStudents.length;
        this.filterBootCamp();
      },
      (error) => {
        console.error('Error fetching bootcamp students:', error);
      }
    );
  }

  filterBootCamp() {
    this.filteredBootCamp.data = this.bootCampStudents.filter(student =>
      (!this.selectedPaymentBootCamp|| student.paymentStatus === this.selectedPaymentBootCamp)
    );
    if (this.filteredBootCamp.paginator) {
      this.filteredBootCamp.paginator.firstPage();
    }
    // this.filteredBootCamp.paginator = this.paginator;
  } 
  onCourseChange() {
    this.filterBootCamp();
  }

  editBootcampStudent(student: any) {
    const dialogRef = this.dialog.open(EditBootcampStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw',
      minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.bootCampStudents.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.bootCampStudents[index] = result;
          this.filterBootCamp();
          this.fetchStudents();
        }
      }
    });
  }

  applyFilterBootcamp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredBootCamp.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredBootCamp.paginator) {
      this.filteredBootCamp.paginator.firstPage();
    }
  }

  
}
