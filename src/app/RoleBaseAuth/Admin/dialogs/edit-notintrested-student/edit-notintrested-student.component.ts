import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BATCHES, COURSES } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-edit-notintrested-student',
  templateUrl: './edit-notintrested-student.component.html',
  styleUrls: ['./edit-notintrested-student.component.scss']
})
export class EditNotintrestedStudentComponent {

  notInterestedForm: FormGroup;
  batches = BATCHES;
  courses = COURSES;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditNotintrestedStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mongodbService: MongodbService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
    this.notInterestedForm = this.fb.group({
      firstName: [data.student.firstName, Validators.required],
      lastName: [data.student.lastName, Validators.required],
      mobileNumber: [data.student.mobileNumber, Validators.required],
      email:[data.student.email, Validators.required],
      course: [data.student.course, Validators.required],
      batch: [data.student.batch, Validators.required],
    });
  }

  onSaveNotInterested() {
    if (this.notInterestedForm.valid) {
      let updatedData = { ...this.notInterestedForm.value, _id: this.data.student._id }; 
      this.mongodbService.updateNotInterestedStudent(updatedData).subscribe(
        (response) => {
          this.toastr.success('Not Interested student updated successfully');
          this.dialogRef.close(updatedData);
        },
        (error) => {
          this.toastr.error('Error updating not interested student');
        }
      );
    }
  }
  onSendEmail() {
    const notInterestedId = this.data.student._id; 
    this.mongodbService.sendNotInterestedEmail(notInterestedId).subscribe(
      (response) => {
        this.toastr.success('Email sent successfully');
      },
      (error) => {
        this.toastr.error('Error sending email');
      }
    );
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
