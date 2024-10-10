import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm!: FormGroup;
  showLoginPopup: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/login') {
          this.showLoginPopup = true;
        }
      }
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {

          this.authService.setToken(response.token);
          this.authService.setRole(response.role);
          this.authService.setUsername(response.firstname);
          this.authService.setId(response.id);
          this.authService.setFullname(response.fullName);
          console.log("login response :=> ",response);
          console.log(response.token, response.role, response.firstname, response.id);

          // Redirect based on user role
          this.redirectBasedOnRole(response.role);

          console.log("student login :", this.loginForm.value);
        },
        error => {
          console.error('Signup error', error);
          this.toastr.error('wrong email or password. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        }
      );
    }
  }
  private redirectBasedOnRole(role: string) {
    if (role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'Sub-Admin') {
      this.router.navigate(['/subadmin-dashboard']);
    } else if (role === 'Counselor') {
      this.router.navigate(['/counselor-dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  // navigateToSignUp() {
  //   this.router.navigate(['/signup']);
  // }

  // closeLoginPopup() {
  //   this.showLoginPopup = false;
  //   this.router.navigate(['/']);
  // }

}
