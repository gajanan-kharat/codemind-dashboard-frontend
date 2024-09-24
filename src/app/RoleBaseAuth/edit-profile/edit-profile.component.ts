import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  profileForm: FormGroup;
  userId: any;
  courses = Object.values(Course);
  roles = Object.values(Role);
  photoUrl: string | null = null;
  resumeUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      // role: ['', Validators.required],
      course: ['', Validators.required],
      city: [''],
      gitUrl: [''],
      mockFeedback: [''], 
      attendance: [''],  
      resume: [null],
      photo: [null]
    });
  }

  ngOnInit(): void {
     this.userId = this.authService.getId();
    this.authService.getUserById(this.userId).subscribe(user => {
      this.profileForm.patchValue({
        firstName: user.firstname,
        lastName: user.lastname, 
        email: user.email,
        contact: user.mobile_number,
        role: user.role,
        course: user.course,
        city: user.city || '', 
        gitUrl: user.gitUrl || '' ,
        mockFeedback: user.mockFeedback || '',  // Patch mockFeedback
        attendance: user.attendance || ''  
      });
      this.photoUrl = `http://localhost:3000/${user.photo}`;
      this.resumeUrl = user.resume ? `http://localhost:3000/${user.resume}` : null;
      console.log("profile data :=>",user);
      console.log("profile photo data :=>",user.photo);
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }

  onFileChange(event: any, field: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileForm.patchValue({
        [field]: file
      });
      if (field === 'photo') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photoUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
      if (field === 'resume') {
        this.resumeUrl = URL.createObjectURL(file);
      }
      this.profileForm.get(field)?.updateValueAndValidity();
    }
  }
  

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();
    Object.keys(this.profileForm.value).forEach(key => {
      if (key === 'photo' || key === 'resume') {
        const file = this.profileForm.get(key)?.value;
        if (file) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, this.profileForm.get(key)?.value);
      }
    });
      this.authService.updateUser(this.userId, formData).subscribe(response => {
        this.toastr.success('User Information Updated successfully.', 'Success', {
          timeOut: 3000, 
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        // console.log("profile data", response);
        // console.log("form data :=> ", formData);
      }, error => {
        this.toastr.error('Failed to Updated User Information . Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        // console.error('Error updating user data:', error);
      });
    }
    else {
      this.profileForm.markAllAsTouched();
    }
  }
}