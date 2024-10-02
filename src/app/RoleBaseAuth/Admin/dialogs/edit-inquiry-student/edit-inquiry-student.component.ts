import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-edit-inquiry-student',
  templateUrl: './edit-inquiry-student.component.html',
  styleUrls: ['./edit-inquiry-student.component.scss']
})
export class EditInquiryStudentComponent {
  inquiryForm!: FormGroup;
  isLoading = false;
  inquiryStatuses: string[] = ['Interested', 'Next Batch', 'Not Interested', 'No Response'];

  constructor(
    public dialogRef: MatDialogRef<EditInquiryStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mongodbService: MongodbService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.inquiryForm = this.fb.group({
      firstName: [this.data.student.firstName, Validators.required],
      lastName: [this.data.student.lastName, Validators.required],
      email: [this.data.student.email, [Validators.required, Validators.email]],
      mobileNumber: [this.data.student.mobileNumber, Validators.required],
      course: [this.data.student.course, Validators.required],
      inquiryStatus: [this.data.student.inquiryStatus, Validators.required],
      date: [this.data.student.date]
    });
  }

  /*onSave(): void {
    if (this.inquiryForm.valid) {
      const updatedInquiry = { ...this.data.student, ...this.inquiryForm.value };
   

      this.mongodbService.addFollowUp(updatedInquiry).subscribe(
        (followUpResponse) => {
          this.mongodbService.deleteStudent(this.data.student._id).subscribe(
            (deleteResponse) => {
              this.toastr.success('Inquiry updated and moved to followUp table successfully.', 'Success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true
              });
              this.dialogRef.close(updatedInquiry);
            },
            (deleteError) => {
              console.error('Error deleting original inquiry:', deleteError);
              this.toastr.error('Error deleting original inquiry. Please try again.', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true
              });
            }
          );
        },
        (followUpError) => {
          console.error('Error adding to followUp:', followUpError);
          this.toastr.error('Error adding to followUp. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        }
      );
    } else {
      this.inquiryForm.markAllAsTouched();
    }
  }*/


    onSave(): void {
      if (this.inquiryForm.valid) {
        const updatedInquiry = { ...this.data.student, ...this.inquiryForm.value };
        if (updatedInquiry.inquiryStatus === 'Not Interested') {
          this.mongodbService.addNotInterested(updatedInquiry).subscribe(
            (response) => {
              this.mongodbService.deleteStudent(this.data.student._id).subscribe(
                (deleteResponse) => {
                  this.toastr.success('Inquiry moved to Not Interested table successfully.', 'Success', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    progressBar: true,
                    closeButton: true
                  });
                  this.dialogRef.close(updatedInquiry);
                },
                (deleteError) => {
                  console.error('Error deleting original inquiry:', deleteError);
                  this.toastr.error('Error deleting original inquiry. Please try again.', 'Error', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    progressBar: true,
                    closeButton: true
                  });
                }
              );
            },
            (error) => {
              console.error('Error adding to Not Interested:', error);
              this.toastr.error('Error adding to Not Interested. Please try again.', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true
              });
            }
          );
        } else {
          this.mongodbService.addFollowUp(updatedInquiry).subscribe(
            (followUpResponse) => {
              this.mongodbService.deleteStudent(this.data.student._id).subscribe(
                (deleteResponse) => {
                  this.toastr.success('Inquiry updated and moved to followUp table successfully.', 'Success', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    progressBar: true,
                    closeButton: true
                  });
                  this.dialogRef.close(updatedInquiry);
                },
                (deleteError) => {
                  console.error('Error deleting original inquiry:', deleteError);
                  this.toastr.error('Error deleting original inquiry. Please try again.', 'Error', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    progressBar: true,
                    closeButton: true
                  });
                }
              );
            },
            (followUpError) => {
              console.error('Error adding to followUp:', followUpError);
              this.toastr.error('Error adding to followUp. Please try again.', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true
              });
            }
          );
        }
      } else {
        this.inquiryForm.markAllAsTouched();
      }
    }
    

  onCancel(): void {
    this.dialogRef.close();
  }
}
