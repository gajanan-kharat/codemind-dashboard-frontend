import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentDialogComponent } from '../dialogs/edit-student-dialog/edit-student-dialog.component';
import { TOP_ITEMS, BATCHES, DISPLAYED_COLUMNS, FEEDBACK_OPTIONS, PAYMENT_STATUSES, PLACEMENT_STATUSES } from 'src/app/models/admin-content';
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
  // dataSource = new MatTableDataSource<any>(this.students);
  
  displayedColumns: string[] = DISPLAYED_COLUMNS;

  topItems = TOP_ITEMS;   
  batches:string[] =  BATCHES; 
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

  constructor(private authService: AuthService, private moongodb: MongodbService,  private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filterStudents();
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
  
  

  filterStudents() {
    this.filteredStudents.data = this.students
      .filter(student => 
        (this.selectedBatch === 'All' || student.batch === this.selectedBatch) &&
        (this.selectedCourse === '' || student.course === this.selectedCourse) &&
        (this.selectedFeedback === 'All' || this.calculateOverallFeedback(student) === this.selectedFeedback) &&
        (this.selectedPaymentStatus === 'All' || student.paymentStatus === this.selectedPaymentStatus) &&
        (this.selectedPlacementStatus === 'All' || student.placementStatus === this.selectedPlacementStatus)
      );

    // if (this.filteredStudents.paginator) {
    //   this.filteredStudents.paginator.firstPage();
    // }
  }

onFeedbackChange() {
    this.filterStudents(); 
  }

  onPaymentStatusChange() {
    this.filterStudents(); 
  }

  onPlacementStatusChange() {
    this.filterStudents(); 
  }


  fetchStudents(searchTerm: string = ''): void {
    this.moongodb.getStudent(this.currentPage, this.limit, searchTerm).subscribe(
      (response) => {

        const {totalRecords, totalPages, currentPage, data } = response;
        this.totalPages = totalPages;         
        this.currentPage = currentPage;       
        this.students = data;
        this.totalRecords = totalRecords;
        this.filteredStudents.data = this.students;
        this.filterStudents(); 
        console.log('student data: ', this.students);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex+1; 
    this.limit = event.pageSize; 
    this.filterStudents(); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchStudents(filterValue); 
  }

  refreshData(){
    this.fetchStudents(); 
    this.selectedBatch = 'All';
    this.selectedCourse = '';
    this.selectedFeedback = 'All';
    this.selectedPaymentStatus = 'All';
    this.selectedPlacementStatus = 'All';
    this.filterStudents(); 
    this.searchTerm = '';  
    this.filteredStudents.filter = '';  

    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
        searchInput.value = ''; 
    }

    // if (this.filteredStudents.paginator) {
    //     this.filteredStudents.paginator.firstPage();  
    // }
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

