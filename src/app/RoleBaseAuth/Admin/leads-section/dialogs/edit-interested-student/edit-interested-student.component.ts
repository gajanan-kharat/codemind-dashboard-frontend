import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BATCHES, COURSES } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-edit-interested-student',
  templateUrl: './edit-interested-student.component.html',
  styleUrls: ['./edit-interested-student.component.scss']
})
export class EditInterestedStudentComponent {
  interestedForm: FormGroup;
  courses = COURSES;
  batches = BATCHES;

  constructor(private mongodbService: MongodbService,
    public dialogRef: MatDialogRef<EditInterestedStudentComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
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

  onSave() {
    if (this.interestedForm.valid) {
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
