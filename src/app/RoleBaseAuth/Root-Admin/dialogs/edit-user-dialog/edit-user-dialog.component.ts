import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../../../Admin/dialogs/edit-student-dialog/edit-student-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

    editStudentForm: FormGroup;
    roles = Object.values(Role); 
    isEditing: boolean; 
    isLoading:Boolean = false;
  
    constructor(
      public dialogRef: MatDialogRef<EditUserDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private fb: FormBuilder,
      private toastr: ToastrService,
      private authService: AuthService
    ) {
   
      this. isEditing = !!data && !!data.user;
  
     
      this.editStudentForm = this.fb.group({
        firstname: [this.isEditing ? data.user.firstname : '', Validators.required],
        lastname: [this.isEditing ? data.user.lastname : '', Validators.required],
        mobile_number: [
          this.isEditing? data.user.mobile_number : '',
          [Validators.required, Validators.pattern('[0-9]{10}')], 
        ],
        email: [
          this.isEditing? data.user.email : '',
          [Validators.required, Validators.email]
        ],
        password: ['',  !this.isEditing? Validators.required : Validators.nullValidator],
        role: [this.isEditing ? data.user.role:'', Validators.required]  
      });
    }
  
    onSave(): void {
      if (this.editStudentForm.valid) {
        const user = { ...this.editStudentForm.value };
        if (this.isEditing && !user.password) {
          delete user.password;
        }
        if (this.isEditing) {
          const userId = this.data.user._id; 
          // console.log("user ",user);
          this.updateUser(userId, user);
        } else {
          this.createUser(user); 
        }
      } else {
        this.editStudentForm.markAllAsTouched(); 
      }
    }
  
    updateUser(userId: string, updatedUser: any): void {
      this.isLoading = true;
      this.authService.updateUserManagement( userId, updatedUser).subscribe(
      () => {
          this.isLoading = false;
          this.toastr.success('User Updated successfully.', 'Success', {
          timeOut: 3000, 
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.dialogRef.close(updatedUser);
      },
      (error) => {
      
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
      this.isLoading = true;
      this.authService.signup(newUser).subscribe(
        () => {
          this.isLoading = false;
          this.toastr.success('User created successfully.', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          this.dialogRef.close(newUser); 
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
      this.dialogRef.close(); 
    }
}
