import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentDialogComponent } from '../dialogs/edit-student-dialog/edit-student-dialog.component';
import { TOP_ITEMS, BATCHES, DISPLAYED_COLUMNS, FEEDBACK_OPTIONS, PAYMENT_STATUSES, PLACEMENT_STATUSES } from 'src/app/models/admin-content';
import { MatSort } from '@angular/material/sort';
import { EditPaymentDialogComponent } from '../dialogs/edit-payment-dialog/edit-payment-dialog.component';

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
  // dataSource = new MatTableDataSource<any>(this.students);

  displayedColumns: string[] = [...DISPLAYED_COLUMNS,'Payment'];
 
  //  displayedColumns: string[] = DISPLAYED_COLUMNS;
  topItems = TOP_ITEMS;   
  batches:string[] =  ['All',...BATCHES]; 
  feedbackOptions: string[] = FEEDBACK_OPTIONS;
  paymentStatuses: string[] = ['All', ...PAYMENT_STATUSES];
  placementStatuses: string[] = ['All', ...PLACEMENT_STATUSES];

  selectedBatch = 'All';
  selectedFeedback: string = 'All';
  selectedPaymentStatus: string = 'All';
  selectedPlacementStatus: string = 'All';
  selectedCourse = '';
  searchTerm: string = '';

  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords:number = 0;

  constructor( private moongodb: MongodbService,  private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.filterStudents();

    this.fetchStudents();
   
  }

  ngAfterViewInit() {
    // this.filteredStudents.paginator = this.paginator;
    this.filteredStudents.sort = this.sort; 
  }
  calculateOverallFeedback(student: any): string {
    const feedbackScores:any = { Poor: 1, Average: 2, Good: 3, Excellent: 4 };
  
    const mock1Score = feedbackScores[student.mock1Feedback] || 0;
    const mock2Score = feedbackScores[student.mock2Feedback] || 0;
    const mock3Score = feedbackScores[student.mock3Feedback] || 0;
  
    const totalScore = mock1Score + mock2Score + mock3Score;
    
    const feedbackCount = [student.mock1Feedback, student.mock2Feedback, student.mock3Feedback].filter(fb => fb !== null && fb !== undefined).length || 1; // Avoid divide by zero
  
    const averageScore = totalScore / feedbackCount;
  
    if (averageScore <= 1.5) return 'Poor';
    if (averageScore <= 2.5) return 'Average';
    if (averageScore <= 3.5) return 'Good';
    return 'Excellent';
  }
  
  /*filterStudents() {
    this.filteredStudents.data = this.students
      .filter(student => 
        (this.selectedBatch === 'All' || student.batch === this.selectedBatch) &&
        (this.selectedCourse === '' || student.course === this.selectedCourse) &&
        (this.selectedFeedback === 'All' || this.calculateOverallFeedback(student) === this.selectedFeedback) &&
        (this.selectedPaymentStatus === 'All' || student.paymentStatus === this.selectedPaymentStatus) &&
        (this.selectedPlacementStatus === 'All' || student.placementStatus === this.selectedPlacementStatus)
      );
  }*/

onFeedbackChange() {
    // this.filterStudents(); 
    this.currentPage = 1;
    this.fetchStudents();
    this.filteredStudents.paginator = this.paginator;
  }

  onPaymentStatusChange() {
    // this.filterStudents(); 
    // this.currentPage = 1;
    this.fetchStudents();
    // this.filteredStudents.paginator = this.paginator;
  }

  onPlacementStatusChange() {
    // this.filterStudents(); 
    this.currentPage = 1;
    this.fetchStudents();
    this.filteredStudents.paginator = this.paginator;
  }

  onCourseClick(course: string) {
    this.selectedCourse = course;
    // this.filterStudents();
    this.currentPage = 1;
    this.fetchStudents();
    this.filteredStudents.paginator = this.paginator;
  }

  onBatchChange() {
    // this.filterStudents();
    this.currentPage = 1;
    this.fetchStudents();
    this.filteredStudents.paginator = this.paginator;
  }


  fetchStudents(searchTerm: string = ''): void {
    const filters = {
      batch: this.selectedBatch || '',
      course: this.selectedCourse || '',
      feedback: this.selectedFeedback || '',
      paymentStatus: this.selectedPaymentStatus || '',
      placementStatus: this.selectedPlacementStatus || '',
    };
    
    this.moongodb.getStudent(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response) => {

        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.students = data;
        this.totalRecords = totalRecords;
        this.filteredStudents.data = this.students;
        // this.filterStudents(); 
        console.log('student data: ', this.students);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
    
  }

  getLastPaymentStatus(student: any): string | undefined { 
    if (student.payments && student.payments.length > 0) {
      const lastPayment = student.payments[student.payments.length - 1];
      return lastPayment.paymentStatus; 
    }
    return undefined; 
  }
  
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.fetchStudents(); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudents(filterValue); 
  }

  refreshData(){
    // this.fetchStudents(); 
    this.selectedBatch = 'All';
    this.selectedCourse = '';
    this.selectedFeedback = 'All';
    this.selectedPaymentStatus = 'All';
    this.selectedPlacementStatus = 'All';
    // this.filterStudents(); 
    this.fetchStudents();
    this.searchTerm = '';  
    this.filteredStudents.filter = '';  

    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
        searchInput.value = ''; 
    }
  }
  downloadReport() {
    const reportData = this.filteredStudents.filteredData;
    this.moongodb.generateStudentsReport(reportData).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'students-report.pdf';
      link.click();
      window.open(url);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error generating report:', error);
      alert('Something went wrong while generating the report. Please try again later.');
    });
  }
  
  
 
  editStudent(student: any) {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '80%',
      data: { student }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.students.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.students[index] = result;
          // this.filterStudents();
          this.fetchStudents();
        }
      }
    });
  }

  openPaymentDialog(student: any) {
    const dialogRef = this.dialog.open(EditPaymentDialogComponent, {
      width: '100%',
      // maxWidth: '80vw', 
      // minWidth: '300px',
      data: {
        student: student,
        // paymentStatus: student.paymentStatus
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.students.findIndex(s => s._id === student._id);
        if (index !== -1) {
          this.students[index] = result;
          // this.filterStudents();
          this.fetchStudents();
        }
      }
    });
  }

  addNewStudent(): void {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '80%',
      data: {}, 
      // maxWidth: '80vw',
      // minWidth: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.students.push(result);
        this.fetchStudents(); 
      }
    });
  }

  
}

