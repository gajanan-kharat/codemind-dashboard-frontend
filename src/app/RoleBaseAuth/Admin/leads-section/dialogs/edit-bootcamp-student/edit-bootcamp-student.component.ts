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
      Mobile_number: [data.student.Mobile_number],
      paymentId: [{value: data.student.paymentId,  disabled: true}],
      paymentStatus: [{ value: data.student.paymentStatus, disabled: true }],
      courses: [data.student.courses],
      batch: [data.student.batch],
      inquiry_status: [data.student.inquiryStatus],
      date: [data.student.date],
     
      // comments: this.formBuilder.array(data.student.comments.map((comment: Comment) => this.createCommentGroup(comment)))
    });
  }
  // get comments() {
  //   return this.bootcampForm.get('comments') as FormArray;
  // }

  // createCommentGroup(comment: Comment): FormGroup {
  //   return this.formBuilder.group({
  //     comment: [comment.comment, Validators.required],
  //     commentDate: [comment.commentDate, Validators.required]
  //   });
  // }

  // addComment() {
  //   const newComment: Comment = { comment: '', commentDate: new Date() };
  //   this.comments.push(this.createCommentGroup(newComment));
  // }
  
  onSavebootcamp() {
    if (this.bootcampForm.valid) {
      let updatedData = { ...this.bootcampForm.value, _id: this.data.student._id };
      const formattedDate = this.datePipe.transform(updatedData.date, 'yyyy-MM-dd'); 
      updatedData = { ...updatedData, date: formattedDate };
      console.log("bootcamp date :=>",updatedData.date);
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