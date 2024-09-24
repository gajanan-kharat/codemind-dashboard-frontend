import { Component, ViewChild } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { BATCHES, COURSES, DISPLAYED_COLUMNS, DISPLAYED_COLUMNSBOOTCAMP, DISPLAYED_COLUMNSFOLLOW, INQUIRYSTATUSES, PAYMENT_STATUS } from 'src/app/models/admin-content';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { EditInquiryStudentComponent } from '../edit-inquiry-student/edit-inquiry-student.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditFollowupStudentComponent } from '../edit-followup-student/edit-followup-student.component';
import { EditBootcampStudentComponent } from '../edit-bootcamp-student/edit-bootcamp-student.component';

@Component({
  selector: 'app-leds',
  templateUrl: './leds.component.html',
  styleUrls: ['./leds.component.scss']
})
export class LedsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  filteredLeads = new MatTableDataSource<any>();
  filteredFollowUp = new MatTableDataSource<any>();
  filteredBootCamp = new MatTableDataSource<any>();


  Inquirystudents: any[] = [];
  followUpStudents: any[] = [];
  bootCampStudents: any[] = [];

  InquiryDataLength:number=0;
  followUpDataLength:number=0;
  bootCampDataLength:number=0;

  InquiryDataCount:number=0;
  followUpDataCount:number=0;
  bootCampDataCount: number=0;

  // dataSource = new MatTableDataSource<any>(this.Inquirystudents);

  courses: string[] = COURSES; 
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  displayedColumnsFollow:string[] = DISPLAYED_COLUMNSFOLLOW;
  displayedColumnsBootcamp:string[] = DISPLAYED_COLUMNSBOOTCAMP;
  inquiryStatuses: string[] = INQUIRYSTATUSES 
  payment_status: string[] = PAYMENT_STATUS; 

  selectedCourseLeads = '';
  selectedCourseFollowUp = '';
  selectedStatusFollowUp = '';
  selectedPaymentBootCamp = '';
  selectedStartDate = '';
  selectedEndDate = '';
  selectedCard = '';

  dateRangeForm: FormGroup;

  constructor(private mongodbService: MongodbService, private dialog: MatDialog, private fb: FormBuilder) {
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: ['']
    });
  }

  ngOnInit(): void {
    this.fetchStudents();
    console.log("length",  this.InquiryDataLength);
    
    this.dateRangeForm.valueChanges.subscribe(() => this.filterFollowUp());
  }

  ngAfterViewInit() {
    if (this.selectedCard === 'leads') {
    this.filteredLeads.paginator = this.paginator;
    this.filteredLeads.sort = this.sort; 
    } else if(this.selectedCard === 'followup'){
      this.filteredFollowUp.paginator = this.paginator;
      this.filteredFollowUp.sort = this.sort; 
    } else if(this.selectedCard === 'bootcamp'){
      this.filteredBootCamp.paginator = this.paginator;
      this.filteredBootCamp.sort = this.sort; 
    }
  
   
  }
  
  InquiryDataCountStop:any =setInterval(()=>{
    this.InquiryDataCount++;
    if(this.InquiryDataCount == this.InquiryDataLength){
      clearInterval(this.InquiryDataCountStop)
    }
  },500)

  followUpDataCountStop:any =setInterval(()=>{
    this.followUpDataCount++;
    if(this.followUpDataCount ==  this.followUpDataLength){
      clearInterval(this.followUpDataCountStop)
    }
  },500)

  bootCampDataCountStop:any =setInterval(()=>{
    this. bootCampDataCount++;
    if(this.bootCampDataCount ==  this.bootCampDataLength){
      clearInterval(this.bootCampDataCountStop)
    }
  },500)

  fetchStudents(): void {
    this.mongodbService.getInquiryStudent().subscribe(
      (data) => {
        this.Inquirystudents = data;
        this.InquiryDataLength=this.Inquirystudents.length;
        this.filterLeads();
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );

    this.mongodbService.getFollowUp().subscribe(
      (data) => {
        this.followUpStudents = data;
        this.followUpDataLength =  this.followUpStudents.length;
        this.filterFollowUp();
      },
      (error) => {
        console.error('Error fetching follow-up students:', error);
      }
    );

     // Fetch BootCamp data
     this.mongodbService.getBootCamp().subscribe(
      (data) => {
        this.bootCampStudents = data;
        this.bootCampDataLength =  this.bootCampStudents.length;
        console.log("Bootcamp Data:=>",this.bootCampStudents);
        this.bootCampDataLength = this.bootCampStudents.length;
        this.filterBootCamp();
      },
      (error) => {
        console.error('Error fetching bootcamp students:', error);
      }
    );
  }

  filterLeads() {
    this.filteredLeads.data = this.Inquirystudents.filter(student =>
      (!this.selectedCourseLeads || student.course === this.selectedCourseLeads)
    );
    // this.filteredLeads.paginator = this.paginator;
  }

  filterFollowUp() {
    const { start, end } = this.dateRangeForm.value;
    this.filteredFollowUp.data = this.followUpStudents.filter(student => {
      const studentDate = new Date(student.date);
      const isDateInRange = (!start || studentDate >= new Date(start)) && (!end || studentDate <= new Date(end));
      return isDateInRange &&
             (!this.selectedCourseFollowUp || student.course === this.selectedCourseFollowUp) &&
             (!this.selectedStatusFollowUp || student.inquiryStatus === this.selectedStatusFollowUp);
    });
    // this.filteredFollowUp.paginator = this.paginator;
  }

  filterBootCamp() {
    this.filteredBootCamp.data = this.bootCampStudents.filter(student =>
      (!this.selectedPaymentBootCamp|| student.paymentStatus === this.selectedPaymentBootCamp)
    );
    // this.filteredBootCamp.paginator = this.paginator;
  } 

  onCardClick(card: string) {
    this.selectedCard = card;
  }

  onCourseChange() {
    if (this.selectedCard === 'leads') {
      this.filterLeads();
    } else if (this.selectedCard === 'followup') {
      this.filterFollowUp();
    } else if (this.selectedCard === 'bootcamp') {
      this.filterBootCamp();
    }
  }

  onStatusChange() {
    if (this.selectedCard === 'followup') {
      this.filterFollowUp();
    }
  }

  editFollowUpStudent(student: any) {
    const dialogRef = this.dialog.open(EditFollowupStudentComponent, {
        width: '100%',
        data: { student },
        maxWidth: '80vw',
        minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
            const index = this.followUpStudents.findIndex(s => s._id === student._id);
            if (index !== -1) {
                this.followUpStudents[index] = result;
                this.filterFollowUp();
                this.fetchStudents(); 
            }
        }
    });
}


  editStudent(student: any) {
    console.log("Student data =>", student);
    const dialogRef = this.dialog.open(EditInquiryStudentComponent, {
      width: '50%',
      data: { student },
      maxWidth: '80vw', 
    minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (this.selectedCard === 'leads') {
          const index = this.Inquirystudents.findIndex(s => s._id === student._id);
          if (index !== -1) {
            this.Inquirystudents[index] = result;
            this.filterLeads();
            this.fetchStudents();
          }
        }
      }
    });
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
/*-----search-----*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredLeads.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredLeads.paginator) {
      this.filteredLeads.paginator.firstPage();
    }
  }

  applyFilterFollowUp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredFollowUp.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredFollowUp.paginator) {
      this.filteredFollowUp.paginator.firstPage();
    }
  }

  applyFilterBootcamp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredBootCamp.filter = filterValue.trim().toLowerCase();
  
    if (this.filteredBootCamp.paginator) {
      this.filteredBootCamp.paginator.firstPage();
    }
  }

}
