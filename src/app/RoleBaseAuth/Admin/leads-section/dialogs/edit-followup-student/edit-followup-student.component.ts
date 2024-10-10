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
            inquiry_status: [data.student.inquiryStatus],
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

    onSave() {
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
    }

    onCancel() {
        this.dialogRef.close();
    }
  }

