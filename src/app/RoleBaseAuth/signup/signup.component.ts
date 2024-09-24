import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  roles = Object.values(Role);
  courses = Object.values(Course);
  showSignUpPopup: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,  private toastr: ToastrService) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required],
      role: ['Student', Validators.required],
      course: ['Angular', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/admin/login') {
          this.showSignUpPopup = true; 
        }
      }
    });
  }
  get  firstname() { return this.   signupForm.get('firstname'); }
  get  lastname() { return this.   signupForm.get('lastname'); }
  get email() { return this.   signupForm.get('email'); }
  get mobile_number() { return this.   signupForm.get('mobile_number'); }
  get password() { return this.   signupForm.get('password'); }
  get role() { return this.   signupForm.get('role'); }
  get course() { return this.   signupForm.get('course'); }

  onSubmit() {
    if (this.signupForm.valid) {
      debugger;
      this.authService.signup(this.signupForm.value).subscribe(
        response => {
          this.toastr.success('Your SignUp successfully.', 'Success', {
            timeOut: 3000, 
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          console.log('User signed up', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup error', error);
          this.toastr.error('There is an error saving your registration. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        }
      );
      // console.log('User signed up', this.signupForm.value);
    }
  }

  navigateToLoginIn() {
    this.router.navigate(['/login']); 
  }
  closeSignUpPopup() {
    this.showSignUpPopup = false;
    this.router.navigate(['/']); 
  }


}
