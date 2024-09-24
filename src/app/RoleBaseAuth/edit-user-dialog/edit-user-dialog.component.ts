import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../Admin/dialogs/edit-student-dialog/edit-student-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  /*editStudentForm: FormGroup;
  roles = Object.values(Role); 

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
      role: [data.student.role || Role.Student, Validators.required]  
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
        this.toastr.success('User Updated successfully.', 'Success', {
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
        this.toastr.error('Error Updating User Information. Please try again.', 'Error', {
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
  }*/


    editStudentForm: FormGroup;
    roles = Object.values(Role); 
    isEditing: boolean; // To track if we're editing or creating a new user
  
    constructor(
      public dialogRef: MatDialogRef<EditUserDialogComponent>, // Use EditUserDialogComponent
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private fb: FormBuilder,
      private toastr: ToastrService,
      private authService: AuthService
    ) {
      // Determine if we are editing or creating a new user
      this. isEditing = !!data && !!data.student;
  
      // Initialize form based on whether we're editing or creating
      this.editStudentForm = this.fb.group({
        firstname: [this.isEditing ? data.student.firstname : '', Validators.required],
        lastname: [this.isEditing ? data.student.lastname : '', Validators.required],
        mobile_number: [
          this.isEditing? data.student.mobile_number : '',
          [Validators.required, Validators.pattern('[0-9]{10}')], // Mobile number validation
        ],
        email: [
          this.isEditing? data.student.email : '',
          [Validators.required, Validators.email]
        ],
        password: ['',  !this.isEditing? Validators.required : Validators.nullValidator],
        // course: [this.isNewUser ? data.student.course : '', Validators.required],
        role: [this.isEditing ? data.student.role || Role.Student : Role.Student, Validators.required]  
      });
    }
  
    onSave(): void {
      if (this.editStudentForm.valid) {
        const user = { ...this.editStudentForm.value };
        if (this.isEditing && !user.password) {
          delete user.password;
        }
        if (this.isEditing) {
          const userId = this.data.student._id; // Get user ID for editing
          // if (!user.password) {
          //   delete user.password;
          // }
          console.log("user ",user);
          this.updateUser(userId, user);
        } else {
          this.createUser(user); // Create a new user
        }
      } else {
        this.editStudentForm.markAllAsTouched(); // Mark all form controls as touched to trigger validation messages
      }
    }
  
    updateUser(userId: string, updatedUser: any): void {
      debugger;
      console.log("user Id:=>",userId);
      console.log("updated user :=>",updatedUser);
     // Send update request to MongoDB with the student ID
    this.authService.updateUserManagement( userId, updatedUser).subscribe(
      () => {
        // Show success notification
        this.toastr.success('User Updated successfully.', 'Success', {
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
        this.toastr.error('Error Updating User Information. Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
      }
    );
    }
  
    createUser(newUser: any): void {
      this.authService.signup(newUser).subscribe(
        () => {
          this.toastr.success('User created successfully.', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          this.dialogRef.close(newUser); // Close dialog and return new user data
        },
        (error) => {
          console.error('Error creating user:', error);
          this.toastr.error('Error creating user. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        }
      );
    }
  
    onCancel(): void {
      this.dialogRef.close(); // Close the dialog without saving changes
    }
}
