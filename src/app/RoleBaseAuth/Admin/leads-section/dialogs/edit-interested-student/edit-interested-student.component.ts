import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BATCHES, COURSES } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditPaymentDialogComponent } from '../../../dialogs/edit-payment-dialog/edit-payment-dialog.component';

@Component({
  selector: 'app-edit-interested-student',
  templateUrl: './edit-interested-student.component.html',
  styleUrls: ['./edit-interested-student.component.scss']
})
export class EditInterestedStudentComponent {

  @ViewChild(EditPaymentDialogComponent) childFormComponent!: EditPaymentDialogComponent;
  interestedForm: FormGroup;
  formData: any;
  courses = COURSES;
  batches = BATCHES;
  admission:any[] = ['Pending', 'Confirm'];
  selectedAdmissionStatus: string = 'Pending';


  constructor(private mongodbService: MongodbService,
    public dialogRef: MatDialogRef<EditInterestedStudentComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.interestedForm = this.fb.group({
      firstName: [data.student.firstName || '', Validators.required],
      lastName: [data.student.lastName || '', Validators.required],
      email: [data.student.email || '', [Validators.required, Validators.email]],
      mobileNumber: [data.student.mobileNumber || '', Validators.required],
      course: [data.student.course || '', Validators.required],
      batch: [data.student.batch || ''],
      inquiry_status: [data.student.inquiryStatus || ''],
      date: [data.student.date || ''],
      reference: [data.student.reference || ''],
      admission: [data.student.admission || 'Pending'],
      source:[data.student.source || ''],
      sourcecomment:[data.student.sourcecomment || ''],
      comments: this.fb.array(
        data.student.comments ? data.student.comments.map((comment: any) => this.createComment(comment)) : [this.createComment()]
      )
    });
  }

  get comments() {
    return this.interestedForm.get('comments') as FormArray;
  }

  createComment(comment: any = { comment: '', commentDate: '' }): FormGroup {
    return this.fb.group({
      comment: [comment.comment || ''],
      commentDate: [comment.date || '']
    });
  }

  addComment() {
    this.comments.push(this.createComment());
  }

  onAdmissionStatusChange(value: string): void {
    this.selectedAdmissionStatus = value; // Update the selected status
  }

  /*onSave() {
    if (this.interestedForm.valid) {
 
      console.log("payment data :=>",   this.formData);
      // console.log("payment Data:=>",formData);
      // this.onPaymentDataChange() 
      this.mongodbService.updateInterestedStudent(this.data.student._id, this.interestedForm.value)
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
  }*/

    onSave() {
      if (this.interestedForm.valid) {
        const admissionStatus = this.interestedForm.get('admission')?.value;
       
        // When the admission status is "Pending"
       if (admissionStatus === 'Pending') {
        console.log("this.interestedForm.value",this.interestedForm.value);
          this.mongodbService.updateInterestedStudent(this.data.student._id, this.interestedForm.value)
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
                this.toastr.error('Error updating Interested Student Data. Please try again.', 'Error', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                  progressBar: true,
                  closeButton: true
                });
                console.error('Error updating student:', error);
              }
            );
        }
        // When the admission status is "Confirm"
        if (admissionStatus === 'Confirm') {
          this.childFormComponent.markFormTouched();
          if (this.childFormComponent.isValid) {
             const formValues = this.childFormComponent.form;
             const username = localStorage.getItem('user_fullName'); 
             const payment = {
              ...formValues,  
              username: username 
            };
             const payments = [ payment]; 
             console.log("payments:=>",payments);
             const confirmedStudentData = {
              ...this.interestedForm.value, 
              payments, 
          };

          console.log("confirmedStudentData :=>",confirmedStudentData);
          // Save student data in another table (e.g., a "Confirmed Students" table)
          this.mongodbService.saveConfirmedStudent(confirmedStudentData)
            .subscribe(
              (savedStudent) => {
                // If successful, remove the student from the "Interested" table
                this.mongodbService.deleteInterestedStudent(this.data.student._id)
                  .subscribe(
                    () => {
                      this.toastr.success('Student confirmed and moved to Confirmed table.', 'Success', {
                        timeOut: 3000,
                        positionClass: 'toast-top-right',
                        progressBar: true,
                        closeButton: true
                      });
                      this.dialogRef.close(savedStudent); 
                    },
                    (error) => {
                      this.toastr.error('Error removing student from Interested table. Please try again.', 'Error', {
                        timeOut: 3000,
                        positionClass: 'toast-top-right',
                        progressBar: true,
                        closeButton: true
                      });
                      console.error('Error deleting student:', error);
                    }
                  );
              },
              (error) => {
                this.toastr.error('Error saving Confirmed Student Data. Please try again.', 'Error', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                  progressBar: true,
                  closeButton: true
                });
                console.error('Error saving confirmed student:', error);
              }
            );
          }
        }
      }
    }
    

  onCancel(): void {
    this.dialogRef.close();
  }

  /*onFormDataChange(data: FormGroup) {
    this.formData = data.value; 
    console.log("payment data :=>", this.formData);
  }*/
}
