import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BATCHES, COURSES } from 'src/app/models/admin-content';
import { MongodbService } from 'src/app/services/mongodb.service';
import { BootcampService } from 'src/app/services/bootcamp.service';

@Component({
  selector: 'app-edit-bootcamp-notinterested-student',
  templateUrl: './edit-bootcamp-notinterested-student.component.html',
  styleUrls: ['./edit-bootcamp-notinterested-student.component.scss']
})
export class EditBootcampNotinterestedStudentComponent {
  notInterestedForm: FormGroup;
  batches = BATCHES;
  courses = COURSES;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBootcampNotinterestedStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mongodbService: MongodbService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private bootcampService: BootcampService
  ) {
    this.notInterestedForm = this.fb.group({
      firstName: [data.student.firstName, Validators.required],
      lastName: [data.student.lastName, Validators.required],
      mobileNumber: [data.student.mobileNumber, Validators.required],
      email:[data.student.email, Validators.required],
      course: [data.student.course, Validators.required],
      source:[data.student.source || ''],
      sourcecomment:[data.student.sourcecomment || ''],
    });
  }

  onSaveNotInterested() {
    if (this.notInterestedForm.valid) {
      let updatedData = { ...this.notInterestedForm.value, _id: this.data.student._id }; 
      this.bootcampService.updateBootcampNotInterestedStudent(updatedData).subscribe(
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
 
   onCancel() {
    this.dialogRef.close();
  }

}
