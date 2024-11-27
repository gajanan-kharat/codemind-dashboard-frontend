import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { COURSES, SOURCE_STATUS } from 'src/app/models/admin-content';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { EditBootcampNotinterestedStudentComponent } from '../edit-bootcamp-notinterested-student/edit-bootcamp-notinterested-student.component';

@Component({
  selector: 'app-edit-codemind-bootcamp',
  templateUrl: './edit-codemind-bootcamp.component.html',
  styleUrls: ['./edit-codemind-bootcamp.component.scss']
})
export class EditCodemindBootcampComponent {
  bootcampForm: FormGroup;
  courses = COURSES;
  bootcampName = SOURCE_STATUS;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBootcampNotinterestedStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private bootcampService: BootcampService
  ) {
    this.bootcampForm = this.fb.group({
      firstName: [data.student.firstName, Validators.required],
      lastName: [data.student.lastName, Validators.required],
      mobileNumber: [data.student.mobileNumber, Validators.required],
      email:[data.student.email, Validators.required],
      course: [data.student.course],
      selectedBootcamp:[data.student.selectedBootcamp || ''],
      source:[data.student.source || ''],
    });
  }

  onSave() {
    if (this.bootcampForm.valid) {
      let updatedData = { ...this.bootcampForm.value, _id: this.data.student._id }; 
      this.bootcampService.updateCodemindBootcampStudent(updatedData).subscribe(
        (response) => {
          this.toastr.success('Codemind Bootcamp student updated successfully');
          this.dialogRef.close(updatedData);
        },
        (error) => {
          this.toastr.error('Error updating Codemind Bootcamp student');
        }
      );
    }
  }
 
   onCancel() {
    this.dialogRef.close();
  }

}
