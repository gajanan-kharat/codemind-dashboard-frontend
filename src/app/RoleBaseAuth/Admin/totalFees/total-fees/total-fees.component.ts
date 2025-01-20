import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BATCHES, COURSES, DISPLAYED_FEES_COLUMNS, TOP_ITEMS } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-total-fees',
  templateUrl: './total-fees.component.html',
  styleUrls: ['./total-fees.component.scss']
})
export class TotalFeesComponent {
  feesSummary = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort; 

  fromDate!: string;
  toDate!: string;
  selectedCourse: string = 'All';
  selectedBatch: string = 'All';
 
  courses = COURSES;
  batches = BATCHES;
  topItems = TOP_ITEMS;
  displayRow = false;
  isLoading: Boolean = false;
  displayedFeesColumns = DISPLAYED_FEES_COLUMNS;

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;

  constructor(private mongodb: MongodbService) {
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
  ngAfterViewInit() {
    this.feesSummary.sort = this.sort;
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
    this.isLoading = true;
    const filters = {
      course: this.selectedCourse || '',
      batch: this.selectedBatch || '',
      startDate: this.fromDate || '',
      endDate: this.toDate || '',
    };
    this.mongodb.getStudentFees(this.currentPage, this.limit, filters)
      .subscribe((response) => {
        this.isLoading = false;
        const { totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.totalRecords = totalRecords;
        this.feesSummary.data = data;
        // console.log(this.feesSummary);
      }, (error) => {
        this.isLoading = false;
        console.error('Error fetching fees summary', error);
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchFeesSummary();
  }

  onBatchChange() {
    this.displayRow = this.selectedBatch !== 'All';
    this.fetchFeesSummary();
  }

  onCourseChange() {
    this.fetchFeesSummary();
  }
  onDateChange() {
    this.fetchFeesSummary();
  }

  refreshData() {
    this.feesSummary.data = [];
    this.selectedCourse = 'All';
    this.selectedBatch = 'All';

    // Reset to the default date range (one month)
    const currentDate = new Date();
    this.toDate = this.formatDate(currentDate);

    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
    this.fromDate = this.formatDate(lastMonthDate);

    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchFeesSummary();
  }
}
