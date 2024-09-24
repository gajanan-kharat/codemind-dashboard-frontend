import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  editStudentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    
    this.editStudentForm = this.fb.group({
      firstname: [data.student.firstname, Validators.required],
      lastname: [data.student.lastname, Validators.required],
      mobile_number: [data.student.mobile_number, [Validators.required, Validators.pattern('[0-9]{10}')]], // Mobile number validation
      email: [data.student.email, [Validators.required, Validators.email]],
      course: [data.student.course, Validators.required],
      role: [data.student.role, Validators.required] 
    });
  }

  onSave(): void {
    if (this.editStudentForm.valid) {
      const updatedUser = { ...this.editStudentForm.value };
      const userId = this.data.student._id; 

    // Send update request to MongoDB with the student ID
    this.authService.updateUserManagement( userId, updatedUser).subscribe(
      () => {
        // Show success notification
        this.toastr.success('Student Mock Information Updated successfully.', 'Success', {
          timeOut: 3000, 
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        // Close dialog and return updated data
        this.dialogRef.close(updatedUser);
      },
      (error) => {
        // Handle error case
        console.error('Error updating student:', error);
        this.toastr.error('Error Updating Student Mock Information. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
      }
    );
  } else {
    // Mark all form controls as touched to trigger validation messages
    this.editStudentForm.markAllAsTouched();
  }
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
