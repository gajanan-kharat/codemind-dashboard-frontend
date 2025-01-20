import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BATCHES, INQUIRYSTATUSES } from 'src/app/models/admin-content';
import { Course } from 'src/app/models/course';
import { MongodbService } from 'src/app/services/mongodb.service';

interface Comment {
  comment: string;
  date: Date;
}

@Component({
  selector: 'app-edit-followup-student',
  templateUrl: './edit-followup-student.component.html',
  styleUrls: ['./edit-followup-student.component.scss']
})
export class EditFollowupStudentComponent {
  
    followupForm!: FormGroup;
    batches = BATCHES;
    courses = Object.values(Course);
    inquiryStatuses =INQUIRYSTATUSES

    constructor(
        public dialogRef: MatDialogRef<EditFollowupStudentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { student:  any },
        private formBuilder: FormBuilder,
        private mongodbService: MongodbService,
        private toastr: ToastrService
    ) {
        this.followupForm = this.formBuilder.group({
            firstName: [data.student.firstName, Validators.required],
            lastName: [data.student.lastName, Validators.required],
            email: [data.student.email, [Validators.required, Validators.email]],
            mobileNumber: [data.student.mobileNumber, [Validators.required, Validators.pattern('[0-9]{10}')]],
            course: [data.student.course],
            batch: [data.student.batch],
            inquiryStatus: [data.student.inquiryStatus],
            date: [data.student.date],
            // source: {data.student.source},
            // sourcecomments: {type: String},
            comments: this.formBuilder.array(data.student.comments.map((comment: Comment) => this.createCommentGroup(comment)))
        });
    }

    get comments() {
        return this.followupForm.get('comments') as FormArray;
    }

    createCommentGroup(comment: Comment): FormGroup {
        return this.formBuilder.group({
            comment: [comment.comment, Validators.required],
            date: [comment.date, Validators.required]
        });
    }

    addComment() {
        const newComment: Comment = { comment: '', date: new Date() };
        this.comments.push(this.createCommentGroup(newComment));
    }

    /*onSave() {
        if (this.followupForm.valid) {
            const updatedData = { ...this.followupForm.value, _id: this.data.student._id };
            this.mongodbService.updateFollowUpStudent(updatedData).subscribe(
                (response) => {
                    this.toastr.success('Follow-up updated successfully');
                    this.dialogRef.close(updatedData);
                },
                (error) => {
                    this.toastr.error('Error updating follow-up');
                }
            );
        }
    }*/

    onSave(): void {
        if (this.followupForm.valid) {
          const updatedInquiry = { ...this.followupForm.value, _id: this.data.student._id };
      
          // Determine the appropriate API call based on inquiryStatus
          switch (updatedInquiry.inquiryStatus) {
            case 'Interested':
              // Call Interested API
              this.mongodbService.addInterested(updatedInquiry).subscribe(
                (response) => {
                  this.handleDeleteAndClose(updatedInquiry, 'FollowUp updated and moved to Interested table successfully.');
                },
                (error) => {
                  this.handleError('Error adding to Interested. Please try again.', error);
                }
              );
              break;
      
            case 'Need FollowUp':
            case 'No Response':
                // Handle the empty case (resetting values)
                this.mongodbService.updateFollowUpStudent(updatedInquiry).subscribe(
                  (response) => {
                    this.toastr.success('FollowUp updated and Follow Up details reset successfully.', 'Success', {
                      timeOut: 3000,
                      positionClass: 'toast-top-right',
                      progressBar: true,
                      closeButton: true,
                    });
                    this.dialogRef.close(updatedInquiry);
                  },
                  (error) => {
                    this.handleError('Error updating Follow Up details. Please try again.', error);
                  }
                );
             
              break;
            case 'Not Interested':
              // Call Not Interested API
              this.mongodbService.addNotInterested(updatedInquiry).subscribe(
                (response) => {
                  this.handleDeleteAndClose(updatedInquiry, 'FollowUp moved to Not Interested table successfully.');
                },
                (error) => {
                  this.handleError('Error adding to Not Interested. Please try again.', error);
                }
              );
              break;
      
            default:
              // Handle default case with update API
              this.mongodbService.updateFollowUpStudent(updatedInquiry).subscribe(
                (response) => {
                  this.toastr.success('FollowUp updated successfully.', 'Success', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    progressBar: true,
                    closeButton: true,
                  });
                  this.dialogRef.close(updatedInquiry);
                },
                (error) => {
                  this.handleError('Error updating FollowUp. Please try again.', error);
                }
              );
          }
        } else {
          this.followupForm.markAllAsTouched();
        }
      }
      
      // Helper function to handle delete operation and close dialog
      private handleDeleteAndClose(updatedInquiry: any, successMessage: string): void {
        this.mongodbService.deleteFollowUpStudent(this.data.student._id).subscribe(
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
            this.handleError('Error deleting original FollowUp. Please try again.', error);
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

