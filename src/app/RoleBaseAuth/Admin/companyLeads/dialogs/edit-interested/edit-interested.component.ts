import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { COURSES, INQUIRYSTATUSES, SOURCEOPTIONS } from 'src/app/models/admin-content';
import { HireusService } from 'src/app/services/hireus.service';
import { EditFollowupComponent } from '../edit-followup/edit-followup.component';

@Component({
  selector: 'app-edit-interested',
  templateUrl: './edit-interested.component.html',
  styleUrls: ['./edit-interested.component.scss']
})
export class EditInterestedComponent {
  interestedForm!: FormGroup;
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
      this.interestedForm = this.fb.group({
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
        this.interestedForm.get('inquiryStatus')?.setValidators(Validators.required);
      } else {
        // Clear validators for fields not required in add mode
        this.interestedForm.get('inquiryStatus')?.clearValidators();
      }
    
      // Update the validity of the form after setting/removing validators
      this.interestedForm.updateValueAndValidity();
    }
    
    onSave() {
    if (this.interestedForm.valid) {
      this.hireusService.updateHireUsInterested(this.data.student._id, this.interestedForm.value)
        .subscribe(
          (updatedStudent) => {
            this.toastr.success('Updated Interested Student Data successfully.', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.dialogRef.close(updatedStudent); 
          },
          (error) => {
            this.toastr.error('Error updating Interstered Student Data. Please try again.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            console.error('Error updating student:', error);
          }
        );
    }
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
