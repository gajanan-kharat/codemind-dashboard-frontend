import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { COURSES } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-edit-inquiry-student',
  templateUrl: './edit-inquiry-student.component.html',
  styleUrls: ['./edit-inquiry-student.component.scss']
})
export class EditInquiryStudentComponent {
  inquiryForm!: FormGroup;
  isLoading = false;
  isEditMode: boolean = false;
  inquiryStatuses: string[] = ['Interested', 'Need FollowUp', 'Not Interested', 'No Response'];
  sourceOptions: string[] = [
    'Codemind Website',
    'Instagram',
    'Facebook',
    'LinkedIn',
    'Reference'
  ];
  courses = COURSES;

  constructor(
    public dialogRef: MatDialogRef<EditInquiryStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mongodbService: MongodbService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  /*ngOnInit(): void {
    this.isEditMode = this.data && this.data.student;
    this.inquiryForm = this.fb.group({
      firstName: [this.isEditMode ? this.data.student.firstName : '', Validators.required],
      lastName: [this.isEditMode ? this.data.student.lastName : '', Validators.required],
      email: [this.isEditMode ? this.data.student.email : '', [Validators.required, Validators.email]],
      mobileNumber: [this.isEditMode ? this.data.student.mobileNumber : '', Validators.required],
      course: [this.isEditMode ? this.data.student.course : '', Validators.required],
      inquiryStatus: [this.isEditMode ? this.data.student.inquiryStatus :'', Validators.required],
      date: [this.isEditMode ? this.data.student.date:''],
      source: [this.isEditMode ? this.data.student.source : ''], 
      sourcecomment: [this.isEditMode ? this.data.student.sourcecomment : ''] 
    });
  }*/

    ngOnInit(): void {
      this.isEditMode = this.data && this.data.student;
    
      // Initialize the form controls
      this.inquiryForm = this.fb.group({
        firstName: [this.isEditMode ? this.data.student.firstName : '', Validators.required],
        lastName: [this.isEditMode ? this.data.student.lastName : '', Validators.required],
        email: [this.isEditMode ? this.data.student.email : '', [Validators.required, Validators.email]],
        mobileNumber: [this.isEditMode ? this.data.student.mobileNumber : '', Validators.required],
        course: [this.isEditMode ? this.data.student.course : '', Validators.required],
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
        this.inquiryForm.get('inquiryStatus')?.setValidators(Validators.required);
        // this.inquiryForm.get('date')?.setValidators(Validators.required);
        // this.inquiryForm.get('source')?.setValidators(Validators.required);
        // this.inquiryForm.get('sourcecomment')?.setValidators(Validators.required);
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
    

  /*convertLocalToUTC(localDate: Date): Date {
    const timezoneOffset = localDate.getTimezoneOffset(); // Get the local timezone offset
    const utcDate = new Date(localDate.getTime() + timezoneOffset * 60000); // Adjust the date to UTC
    return utcDate;
  }*/

    onSave(): void {
        if (this.inquiryForm.valid) {
          /*const formData = this.inquiryForm.value;
          formData.date = this.convertLocalToUTC(formData.date);
          console.log("date format :=> ", formData.date);*/
          const updatedInquiry = { ...this.data.student, ...this.inquiryForm.value};
          
          if (updatedInquiry.inquiryStatus === 'Not Interested') {
            // Logic for 'Not Interested' case
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
          } else if (updatedInquiry.inquiryStatus === 'Interested') {
            // Logic for 'Interested' case
            this.mongodbService.addInterested(updatedInquiry).subscribe(
              (interestedResponse) => {
                this.mongodbService.deleteStudent(this.data.student._id).subscribe(
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
            this.mongodbService.addFollowUp(updatedInquiry).subscribe(
              (followUpResponse) => {
                this.mongodbService.deleteStudent(this.data.student._id).subscribe(
                  (deleteResponse) => {
                    this.toastr.success('Inquiry updated and moved to Follow Up table successfully.', 'Success', {
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
      
      onSaveAdd():void{
        if (this.inquiryForm.valid) {
          const { firstName, lastName, email, mobileNumber, course } = this.inquiryForm.value;
          const formData = { firstName, lastName, email, mobileNumber, course };
          console.log("Iquirty Data :=>",formData);
          this.mongodbService.addInquiry(formData).subscribe(
            (response) => {
              this.toastr.success('Inquiry added successfully.', 'Success', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true
              });
              this.dialogRef.close(formData);
            },
            (error) => {
              this.toastr.error('Error adding inquiry. Please try again.', 'Error', {
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
