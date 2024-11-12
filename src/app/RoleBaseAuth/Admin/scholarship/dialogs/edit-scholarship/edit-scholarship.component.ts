import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CollegeDataService } from 'src/app/services/college-data.service';
import { EditCollegeInfoComponent } from '../../../collegeData-section/dialogs/edit-college-info/edit-college-info.component';
import { ScholarshipService } from 'src/app/services/scholarship.service';
import { FEEDBACK_OPTIONS } from 'src/app/models/admin-content';

@Component({
  selector: 'app-edit-scholarship',
  templateUrl: './edit-scholarship.component.html',
  styleUrls: ['./edit-scholarship.component.scss']
})
export class EditScholarshipComponent {
  scholarshipForm!: FormGroup;
  isEditMode: boolean;
  isLoading:Boolean = false;
  visitedStatusOptions = ['Scholarship','In Progress','Selected','Rejected'];
  feedback=['Excellent','Good','Average','Poor'];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditScholarshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private scholarshipDataService: ScholarshipService,
    private toastr: ToastrService,
  ) {


    this.isEditMode = !!data && !!data.scholarship;

    // Initialize the form
    this.scholarshipForm = this.fb.group({
      name: [ this.isEditMode ? data.scholarship.name : '', Validators.required],
      collegeName: [ this.isEditMode ?  data.scholarship.collegeName : '', Validators.required],
      mobileNumber: [ this.isEditMode ?  data.scholarship.mobileNumber : '', Validators.required],
      email: [this.isEditMode ? data.scholarship.email : '', Validators.required],
      graduationMarks: [this.isEditMode ? data.scholarship.graduationMarks : '', Validators.required],
      hscMarks: [  this.isEditMode ?  data.scholarship.hscMarks : '', Validators.required],
      sscMarks: [  this.isEditMode ?  data.scholarship.sscMarks : '', Validators.required],
      address: [ this.isEditMode ?  data.scholarship.address : '', Validators.required],
      scholarshipStatus: [ this.isEditMode ?  data.scholarship.scholarshipStatus : 'Scholarship', Validators.required],
      scholarshipScore: [  this.isEditMode ?  data.scholarship.scholarshipScore : ''],
      interviewFeedback: [  this.isEditMode ?  data.scholarship.interviewFeedback : ''],
      source: [ this.isEditMode ? data.scholarship.source :'', Validators.required],
      date: [ this.isEditMode ? data.scholarship.date : new Date(), Validators.required],
      comment: [  this.isEditMode ? data.scholarship.comment : ''],
    });
  }

  ngOnInit(): void {
  }

 
 // Submit the form (for create or edit)
 onSubmit(): void {
  if (this.scholarshipForm.valid) {
    console.log("data",this.scholarshipForm.value);
    if (this.isEditMode) {
      this.updateScholarship(this.data.scholarship._id,this.scholarshipForm.value);
    } else {
      this.createScholarship(this.scholarshipForm.value);
      
    }
  }
}

// Create new scholarship data
updateScholarship(Id: string, updatedScholarData: any): void {
  this.isLoading = true;
  this.scholarshipDataService.updateScholarshipData(Id, updatedScholarData).subscribe(
  () => {
      this.isLoading = false;
      this.toastr.success('User Updated successfully.', 'Success', {
      timeOut: 3000, 
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true
    });
    this.dialogRef.close(updatedScholarData);
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

createScholarship(newUser: any): void {
  this.isLoading = true;
  this.scholarshipDataService.saveScholarshipData(newUser).subscribe(
    () => {
      this.isLoading = false;
      this.toastr.success('scholarship data save successfully.', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
      this.dialogRef.close(newUser); 
    },
    (error) => {
      console.error('Error save scholarship data :', error);
      this.toastr.error('Error saving scholarship data. Please try again.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
    }
  );
}

 // Close the dialog without saving
 onCancel(): void {
  this.dialogRef.close();
}

}
