import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BATCHES, INQUIRYSTATUSES } from 'src/app/models/admin-content';
import { Course } from 'src/app/models/course';
import { MongodbService } from 'src/app/services/mongodb.service';
import { DatePipe } from '@angular/common';
import { BootcampService } from 'src/app/services/bootcamp.service';

interface Comment {
  comment: string;
  commentDate: Date;
}
@Component({
  selector: 'app-edit-bootcamp-student',
  templateUrl: './edit-bootcamp-student.component.html',
  styleUrls: ['./edit-bootcamp-student.component.scss']
})
export class EditBootcampStudentComponent {
  bootcampForm: FormGroup;
  batches = BATCHES;
  courses = Object.values(Course);
  inquiryStatuses = INQUIRYSTATUSES;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBootcampStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private mongodbService: MongodbService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private bootcampService: BootcampService
  ) {
    this.bootcampForm = this.fb.group({
      firstName: [data.student.firstName, Validators.required],
      lastName: [data.student.lastName, Validators.required],
      email: [data.student.email, [Validators.required, Validators.email]],
      mobileNumber: [data.student.mobileNumber, Validators.required],
      paymentId: [{ value: data.student.paymentId, disabled: true }],
      paymentStatus: [{ value: data.student.paymentStatus, disabled: true }],
      course: [data.student.course, Validators.required],
      batch: [data.student.batch],
      inquiryStatus: [data.student.inquiryStatus],
      date: [data.student.date],
      source: [data.student.source],
      sourcecomment: [data.student.sourcecomment]
    });
  }

  onSavebootcamp(): void {
    if (this.bootcampForm.valid) {
      const updatedInquiry = { ...this.data.student, ...this.bootcampForm.value };

      // Determine the appropriate API call based on inquiryStatus
      switch (updatedInquiry.inquiryStatus) {
        case 'Interested':
          // Call Interested API
          this.bootcampService.addBootcampInterested(updatedInquiry).subscribe(
            (response) => {
              this.handleDeleteAndClose(updatedInquiry, 'Inquiry updated and moved to Interested table successfully.');
            },
            (error) => {
              this.handleError('Error adding to Interested. Please try again.', error);
            }
          );
          break;

        case 'Need FollowUp':
        case 'No Response':
          // Call FollowUp API
          this.bootcampService.addBootcampFollowUp(updatedInquiry).subscribe(
            (response) => {
              this.handleDeleteAndClose(updatedInquiry, 'Inquiry updated and moved to Follow Up table successfully.');
            },
            (error) => {
              this.handleError('Error adding to Follow Up. Please try again.', error);
            }
          );
          break;

        case 'Not Interested':
          // Call Not Interested API
          this.bootcampService.addBootcampNotInterested(updatedInquiry).subscribe(
            (response) => {
              this.handleDeleteAndClose(updatedInquiry, 'Inquiry moved to Not Interested table successfully.');
            },
            (error) => {
              this.handleError('Error adding to Not Interested. Please try again.', error);
            }
          );
          break;

        default:
          // Handle default case with update API
          this.bootcampService.updateBootcampStudent(updatedInquiry).subscribe(
            (response) => {
              this.toastr.success('Inquiry updated successfully.', 'Success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true,
              });
              this.dialogRef.close(updatedInquiry);
            },
            (error) => {
              this.handleError('Error updating inquiry. Please try again.', error);
            }
          );
      }
    } else {
      this.bootcampForm.markAllAsTouched();
    }
  }

  // Helper function to handle delete operation and close dialog
  private handleDeleteAndClose(updatedInquiry: any, successMessage: string): void {
    this.bootcampService.deleteBootcampStudent(this.data.student._id).subscribe(
      (response) => {
        this.toastr.success(successMessage, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true,
        });
        this.dialogRef.close(updatedInquiry);
      },
      (error) => {
        this.handleError('Error deleting original inquiry. Please try again.', error);
      }
    );
  }

  // Helper function to handle error scenarios
  private handleError(errorMessage: string, error: any): void {
    console.error(errorMessage, error);
    this.toastr.error(errorMessage, 'Error', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    });
  }


  onCancel() {
    this.dialogRef.close();
  }
}