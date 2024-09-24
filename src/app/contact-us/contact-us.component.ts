import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MongodbService } from '../services/mongodb.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../models/course';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  form: FormGroup;
  showPopup: boolean = true;
  courses = Object.values(Course);
  

  constructor(private fb: FormBuilder, private router: Router, private mongodbService:MongodbService, private toastr: ToastrService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      course: ['Angular', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/contact') {
          this.showPopup = true; 
        }
      }
    });
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get mobileNumber() { return this.form.get('mobileNumber'); }
  get course() { return this.form.get('course'); }

  onSubmit() { 
    if (this.form.valid) {
      console.log("conatct info:",this.form.value);
      this.mongodbService.saveStudent(this.form.value).subscribe(
        response => {
          console.log('Student data saved', response);
          this.toastr.success('Your registration has been confirmed successfully.', 'Success', {
            timeOut: 3000, 
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          this.closePopup();
        },
        error => {
          console.error('Error saving student data', error);
          this.toastr.error('There is an error saving your registration. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        }
      );
    }
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/']); 
  }

}
