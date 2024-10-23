import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb.service';
import { Course } from 'src/app/models/course';
import { StudentInformation } from 'src/app/models/studentInformation';
import { ToastrService } from 'ngx-toastr';
import { MockStatuses } from 'src/app/models/mock';
import { PAYMENT_STATUSES, PLACEMENT_STATUSES } from 'src/app/models/admin-content';

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
    // paymentStatuses = PAYMENT_STATUSES;
    placementStatuses = PLACEMENT_STATUSES;
    paymentStatusValue = 'Not Paid'; 
    isEditMode: boolean = false;
    
  
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
      this.isEditMode = !!(this.data && this.data.student); 

      if (this.isEditMode && this.data.student.payments && this.data.student.payments.length > 0) {
        const lastPayment = this.data.student.payments[this.data.student.payments.length - 1];
        this.paymentStatusValue = lastPayment.paymentStatus || 'Not Paid'; 
      } else {
        this.paymentStatusValue = 'Not Paid'; // Default value when no payments exist
      }
      

      this.studentForm = this.fb.group({
        firstName: [this.isEditMode ? this.data.student.firstName : '', Validators.required],
        lastName: [this.isEditMode ? this.data.student.lastName: '', Validators.required],
        email: [this.isEditMode ? this.data.student.email : '', [Validators.required, Validators.email]],
        mobileNumber: [this.isEditMode ? this.data.student.mobileNumber :'', Validators.required],
        course: [this.isEditMode ? this.data.student.course : '',],
        batch: [this.isEditMode ? this.data.student.batch : '',],
        graduation: [this.isEditMode ? this.data.student.graduation: '',],
        passingYear: [this.isEditMode ? this.data.student.passingYear : ''],
        collegeName: [this.isEditMode ? this.data.student.collegeName: ''],
        birthdate: [this.isEditMode ? this.data.student.birthdate:''],
        gender: [this.isEditMode ? this.data.student.gender:''], 
        currentlyWorking: [this.isEditMode ? this.data.student.currentlyWorking:''], 
        address: [this.isEditMode ? this.data.student.address: ''],
        cityName: [this.isEditMode ? this.data.student.cityName: ''],
        state: [this.isEditMode ? this.data.student.state: ''],
        attendance: [this.isEditMode ? this.data.student.attendance: ''],
        parentEmail: [this.isEditMode ? this.data.student.parentEmail: ''],
        parentMobileNumber: [this.isEditMode ? this.data.student.parentMobileNumber: ''],
        mock1Feedback:[this.isEditMode ? this.data.student.mock1Feedback:''],
        mock2Feedback:[this.isEditMode ? this.data.student.mock2Feedback:''],
        mock3Feedback:[this.isEditMode ? this.data.student.mock3Feedback:''],
        paymentStatus: [{ value:this.paymentStatusValue,disabled: true }],
        placementStatus: [this.isEditMode ? this.data.student.placementStatus:''],
      });
    }
  
    initializeYears() {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear; year >= 1900; year--) {
        this.years.push(year);
      }
    }
  
    initializeBatches() {
      for (let i = 14; i >= 1 ; i--) {
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

    onSaveAdd(){
      if (this.studentForm.valid) {
        const formData = {
          ...this.studentForm.value,
          paymentStatus: this.paymentStatusValue, 
        };
        // console.log("new student data ",formData);
        // console.log("payment status:=>", this.studentForm.value.paymentStatus.value)
        this.mongodbService.saveNewStudent(formData).subscribe(
          (response) => {
            this.toastr.success('New Student added successfully.', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.dialogRef.close(formData);
          },
          (error) => {
            this.toastr.error('Error adding New Student. Please try again.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
          }
        );
      } else {
        this.studentForm.markAllAsTouched();
      }
      
    }
  }
