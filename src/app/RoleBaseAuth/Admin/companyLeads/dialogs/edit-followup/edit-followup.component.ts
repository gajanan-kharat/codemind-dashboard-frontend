import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { COURSES, INQUIRYSTATUSES, SOURCEOPTIONS } from 'src/app/models/admin-content';
import { HireusService } from 'src/app/services/hireus.service';

@Component({
  selector: 'app-edit-followup',
  templateUrl: './edit-followup.component.html',
  styleUrls: ['./edit-followup.component.scss']
})
export class EditFollowupComponent {
  followupForm!: FormGroup;
  isLoading = false;
  isEditMode: boolean = false;
  inquiryStatuses = INQUIRYSTATUSES;
  sourceOptions = SOURCEOPTIONS;
  courses = COURSES;

  constructor(
    public dialogRef: MatDialogRef<EditFollowupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private hireusService: HireusService,
    private toastr: ToastrService,
  ) {}

    ngOnInit(): void {
      this.isEditMode = this.data && this.data.student;
    
      // Initialize the form controls
      this.followupForm = this.fb.group({
        name: [this.isEditMode ? this.data.student.name : '', Validators.required],
        company: [this.isEditMode ? this.data.student.company : '', Validators.required],
        email: [this.isEditMode ? this.data.student.email : '', [Validators.required, Validators.email]],
        mobileNumber: [this.isEditMode ? this.data.student.mobileNumber : '', Validators.required],
        inquiryStatus: [this.isEditMode ? this.data.student.inquiryStatus : '', Validators.required],
        date: [this.isEditMode ? this.data.student.date : ''],
        source: [this.isEditMode ? this.data.student.source : ''], 
        sourcecomment: [this.isEditMode ? this.data.student.sourcecomment : ''] 
      });
    
      // Set validators based on whether it's edit mode or add mode
      this.setDynamicValidators();
    }
    
    private setDynamicValidators(): void {
      if (this.isEditMode) {
        // Set all fields as required in edit mode
        this.followupForm.get('inquiryStatus')?.setValidators(Validators.required);
      } else {
        // Clear validators for fields not required in add mode
        this.followupForm.get('inquiryStatus')?.clearValidators();
      }
    
      // Update the validity of the form after setting/removing validators
      this.followupForm.updateValueAndValidity();
    }
    
    onSave(): void {
      if (this.followupForm.valid) {
        const updatedInquiry = { ...this.followupForm.value, _id: this.data.student._id };
    
        // Determine the appropriate API call based on inquiryStatus
        switch (updatedInquiry.inquiryStatus) {
          case 'Interested':
            // Call Interested API
            this.hireusService.addHireUsInterested(updatedInquiry).subscribe(
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
               this.hireusService.updateHireUsFollowUp(updatedInquiry).subscribe(
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
            this.hireusService.addHireUsNotInterested(updatedInquiry).subscribe(
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
            this.hireusService.updateHireUsFollowUp(updatedInquiry).subscribe(
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
      this.hireusService.deleteHireUsFollowUp(this.data.student._id).subscribe(
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
      onSaveAdd():void{
        /*if (this.inquiryForm.valid) {
          const { name, company, email, mobileNumber } = this.inquiryForm.value;
          const formData = { name, company, email, mobileNumber };
          console.log("Iquirty Data :=>",formData);
          this.hireusService.addHireUs(formData).subscribe(
            (response) => {
              this.toastr.success('HireUs added successfully.', 'Success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true
              });
              this.dialogRef.close(formData);
            },
            (error) => {
              this.toastr.error('Error adding HireUs/. Please try again.', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true
              });
            }
          );
        } else {
          this.inquiryForm.markAllAsTouched();
        }*/
      }

  onCancel(): void {
    this.dialogRef.close();
  }


}
