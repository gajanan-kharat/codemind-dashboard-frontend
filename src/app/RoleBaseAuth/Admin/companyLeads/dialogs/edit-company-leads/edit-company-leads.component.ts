import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { COURSES, INQUIRYSTATUSES, SOURCEOPTIONS } from 'src/app/models/admin-content';
import { HireusService } from 'src/app/services/hireus.service';

@Component({
  selector: 'app-edit-company-leads',
  templateUrl: './edit-company-leads.component.html',
  styleUrls: ['./edit-company-leads.component.scss']
})
export class EditCompanyLeadsComponent {
  inquiryForm!: FormGroup;
  isLoading = false;
  isEditMode: boolean = false;
  inquiryStatuses = INQUIRYSTATUSES;
  sourceOptions = SOURCEOPTIONS;
  courses = COURSES;

  constructor(
    public dialogRef: MatDialogRef<EditCompanyLeadsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private hireusService: HireusService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data && this.data.student;

    // Initialize the form controls
    this.inquiryForm = this.fb.group({
      name: [this.isEditMode ? this.data.student.name : '', Validators.required],
      company: [this.isEditMode ? this.data.student.company : '', Validators.required],
      email: [this.isEditMode ? this.data.student.email : '', [Validators.required, Validators.email]],
      mobileNumber: [this.isEditMode ? this.data.student.mobileNumber : '', Validators.required],
      lookingFor: [this.isEditMode ? this.data.student.lookingFor : '', Validators.required],
      inquiryStatus: [this.isEditMode ? this.data.student.inquiryStatus : 'Interested', Validators.required],
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
      this.inquiryForm.get('inquiryStatus')?.setValidators(Validators.required);
    } else {
      // Clear validators for fields not required in add mode
      this.inquiryForm.get('inquiryStatus')?.clearValidators();
      this.inquiryForm.get('date')?.clearValidators();
      this.inquiryForm.get('source')?.clearValidators();
      this.inquiryForm.get('sourcecomment')?.clearValidators();
    }

    // Update the validity of the form after setting/removing validators
    this.inquiryForm.updateValueAndValidity();
  }

  onSave(): void {
    if (this.inquiryForm.valid) {
      const updatedInquiry = { ...this.data.student, ...this.inquiryForm.value };

      if (updatedInquiry.inquiryStatus === 'Not Interested') {
        // Logic for 'Not Interested' case
        this.hireusService.addHireUsNotInterested(updatedInquiry).subscribe(
          (response) => {
            this.hireusService.deleteHireUs(this.data.student._id).subscribe(
              (deleteResponse) => {
                this.toastr.success('HireUs moved to Not Interested table successfully.', 'Success', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                  progressBar: true,
                  closeButton: true
                });
                this.dialogRef.close(updatedInquiry);
              },
              (deleteError) => {
                console.error('Error deleting original HireUs:', deleteError);
                this.toastr.error('Error deleting original HireUs. Please try again.', 'Error', {
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
      } else if (updatedInquiry.inquiryStatus === 'Interested') {
        // Logic for 'Interested' case
        this.hireusService.addHireUsInterested(updatedInquiry).subscribe(
          (interestedResponse) => {
            this.hireusService.deleteHireUs(this.data.student._id).subscribe(
              (deleteResponse) => {
                this.toastr.success('Inquiry updated and moved to Interested table successfully.', 'Success', {
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
          (interestedError) => {
            console.error('Error adding to Interested:', interestedError);
            this.toastr.error('Error adding to Interested. Please try again.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
          }
        );
      } else {
        // Logic for 'Follow Up' case (as before)
        this.hireusService.addHireUsFollowUp(updatedInquiry).subscribe(
          (followUpResponse) => {
            this.hireusService.deleteHireUs(this.data.student._id).subscribe(
              (deleteResponse) => {
                this.toastr.success('HireUs updated and moved to Follow Up table successfully.', 'Success', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                  progressBar: true,
                  closeButton: true
                });
                this.dialogRef.close(updatedInquiry);
              },
              (deleteError) => {
                console.error('Error deleting original HireUs:', deleteError);
                this.toastr.error('Error deleting original HireUs. Please try again.', 'Error', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                  progressBar: true,
                  closeButton: true
                });
              }
            );
          },
          (followUpError) => {
            console.error('Error adding to Follow Up:', followUpError);
            this.toastr.error('Error adding to Follow Up. Please try again.', 'Error', {
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

  onSaveAdd(): void {
    if (this.inquiryForm.valid) {
      const { name, company, email, mobileNumber } = this.inquiryForm.value;
      const formData = { name, company, email, mobileNumber };
      console.log("Iquirty Data :=>", formData);
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
          this.toastr.error('Error adding HireUs. Please try again.', 'Error', {
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
