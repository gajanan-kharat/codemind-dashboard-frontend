import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb.service';
import { Course } from 'src/app/models/course';
import { StudentInformation } from 'src/app/models/studentInformation';
import { ToastrService } from 'ngx-toastr';
import { MockStatuses } from 'src/app/models/mock';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})

export class EditStudentDialogComponent {
    studentForm!: FormGroup;
    years: number[] = [];
    batches: string[] = [];
    courses = Object.values(Course);
    mockStatuses = Object.values(MockStatuses);
    isLoading:Boolean = false;
  
    constructor(
      public dialogRef: MatDialogRef<EditStudentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { student: StudentInformation },
      private fb: FormBuilder,
      private mongodbService: MongodbService,
      private toastr: ToastrService
    ) {
      this.initializeYears();
      this.initializeBatches();
    }
  
    ngOnInit(): void {
      this.studentForm = this.fb.group({
        firstName: [this.data.student.firstName, Validators.required],
        lastName: [this.data.student.lastName, Validators.required],
        email: [this.data.student.email, [Validators.required, Validators.email]],
        mobileNumber: [this.data.student.mobileNumber, Validators.required],
        course: [this.data.student.course, Validators.required],
        batch: [this.data.student.batch, Validators.required],
        graduation: [this.data.student.graduation, Validators.required],
        passingYear: [this.data.student.passingYear, Validators.required],
        collegeName: [this.data.student.collegeName, Validators.required],
        address: [this.data.student.address, Validators.required],
        cityName: [this.data.student.cityName, Validators.required],
        state: [this.data.student.state, Validators.required],
        attendance: [this.data.student.attendance, Validators.required],
        parentEmail: [this.data.student.parentEmail],
        parentMobileNumber: [this.data.student.parentMobileNumber],
        mock1Feedback:[this.data.student.mock1Feedback],
        mock2Feedback:[this.data.student.mock2Feedback],
        mock3Feedback:[this.data.student.mock3Feedback],
      });
    }
  
    initializeYears() {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear; year >= 1900; year--) {
        this.years.push(year);
      }
    }
  
    initializeBatches() {
      for (let i = 1; i <= 13; i++) {
        this.batches.push(`Batch-${i}`);
      }
    }
  
    onSave(): void {
      if (this.studentForm.valid) {

        const updatedStudent = { ...this.data.student, ...this.studentForm.value };
        this.mongodbService.updateStudent(updatedStudent).subscribe(
          () => {
            this.toastr.success('Student Information Updated successfully.', 'Success', {
              timeOut: 3000, 
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.dialogRef.close(updatedStudent);
          },
          (error) => {
            console.error('Error updating student:', error);
            this.toastr.error('Error Updating Student Information. Please try again.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
          }
        );
      }
      else {
        this.studentForm.markAllAsTouched();
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  
    generateReport(): void {
      this.isLoading = true;
      const studentData = this.studentForm.value;
      this.mongodbService.generateReport(studentData).subscribe(
        (response: any) => {
          this.isLoading = false;
          console.log('Report generated:', response);
          window.open(response.pdfUrl, '_blank');
          this.toastr.success('Report sent to student successfully.', 'Success', {
            timeOut: 3000, 
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        },
        (error) => {
          console.error('Error generating report:', error);
          this.isLoading = false;
          this.toastr.error('Failed to send the report to the student. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        }
      );
    }
  }
