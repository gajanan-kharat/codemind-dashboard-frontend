import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BATCHES, COURSES, DISPLAYED_FEES_COLUMNS, TOP_ITEMS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-total-fees',
  templateUrl: './total-fees.component.html',
  styleUrls: ['./total-fees.component.scss']
})
export class TotalFeesComponent {
  
  fromDate!: string;
  toDate!: string;
  selectedCourse: string = 'All';
  selectedBatch: string = 'All';
  feesSummary = new MatTableDataSource<any>();
  courses = COURSES;
  batches = BATCHES;
  topItems = TOP_ITEMS; 
  displayRow = false;  
  displayedFeesColumns = DISPLAYED_FEES_COLUMNS ;
  constructor(private mongodb:MongodbService){

  }
  
  ngOnInit(): void {
    // Set default date range for one month
    const currentDate = new Date();
    this.toDate = this.formatDate(currentDate);
    
    // One month ago
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
    this.fromDate = this.formatDate(lastMonthDate);
    
    // Fetch the fees summary immediately on component load
    this.fetchFeesSummary();
   
  }
  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; 
  }
  onCourseClick(course: string) {
    this.selectedCourse = course;
    this.fetchFeesSummary();
  }
  fetchFeesSummary() {
    const filters = {
      course:this.selectedCourse|| '',
      batch:this.selectedBatch || '',
      startDate: this.fromDate || '', 
      endDate: this.toDate|| '',     
    };
    this.mongodb.getStudentFees(filters)
      .subscribe((response) => {
        this.feesSummary = response.data;
        console.log(this.feesSummary); 
      }, (error) => {
        console.error('Error fetching fees summary', error);
      });
  }
  onBatchChange() {
    this.displayRow = this.selectedBatch !== 'All';
    this.fetchFeesSummary();  
  }

  onCourseChange(){
    this.fetchFeesSummary();
  }
  onDateChange() {
    this.fetchFeesSummary();
  }
  
}
