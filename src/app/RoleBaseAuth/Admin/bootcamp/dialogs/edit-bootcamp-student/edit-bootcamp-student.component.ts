import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BATCHES, INQUIRYSTATUSES } from 'src/app/models/admin-content';
import { Course } from 'src/app/models/course';
import { MongodbService } from 'src/app/services/mongodb.service';
import { DatePipe } from '@angular/common';

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
    public dialogRef: MatDialogRef< EditBootcampStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private mongodbService: MongodbService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
    this.bootcampForm = this.fb.group({
      firstName: [data.student.firstName],
      lastName: [data.student.lastName],
      email: [data.student.email],
      mobileNumber: [data.student.mobileNumber],
      paymentId: [{value: data.student.paymentId,  disabled: true}],
      paymentStatus: [{ value: data.student.paymentStatus, disabled: true }],
      course: [data.student.course],
      batch: [data.student.batch],
      inquiry_status: [data.student.inquiryStatus],
      date: [data.student.date],
      source: [data.student.source],
      sourcecomment:[data.student.sourcecomment]
    });
  }
  
  onSavebootcamp() {
    if (this.bootcampForm.valid) {
      let updatedData = { ...this.bootcampForm.value, _id: this.data.student._id };
      // const formattedDate = this.datePipe.transform(updatedData.date, 'yyyy-MM-dd'); 
      // updatedData = { ...updatedData, date: formattedDate };
      // console.log("bootcamp date :=>",updatedData.date);
      this.mongodbService.updateBootcampStudent(updatedData).subscribe(
        (response) => {
          this.toastr.success('Bootcamp student updated successfully');
          this.dialogRef.close(updatedData);
        },
        (error) => {
          this.toastr.error('Error updating bootcamp student');
          
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}