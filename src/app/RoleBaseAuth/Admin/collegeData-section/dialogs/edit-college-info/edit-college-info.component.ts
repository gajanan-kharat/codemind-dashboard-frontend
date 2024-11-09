import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CollegeDataService } from 'src/app/services/college-data.service';

@Component({
  selector: 'app-edit-college-info',
  templateUrl: './edit-college-info.component.html',
  styleUrls: ['./edit-college-info.component.scss']
})
export class EditCollegeInfoComponent {
  collegeForm!: FormGroup;
  isEditMode: boolean;
  isLoading:Boolean = false;
  visitedStatusOptions = ['In Progress','In Plan','TODO','Visited'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCollegeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private collegeDataService: CollegeDataService,
    private toastr: ToastrService,
  ) {


    this.isEditMode = !!data && !!data.college;

    // Initialize the form
    this.collegeForm = this.fb.group({
      collegeName: [ this.isEditMode ? data.college.collegeName : '', Validators.required],
      universityName: [ this.isEditMode ?  data.college.universityName : '', Validators.required],
      address: [ this.isEditMode ?  data.college.address : '', Validators.required],
      city: [this.isEditMode ? data.college.city : '', Validators.required],
      state: [this.isEditMode ? data.college.state : '', Validators.required],
      district: [  this.isEditMode ?  data.college.district : '', Validators.required],
      principalName: [  this.isEditMode ?  data.college.principalName : '', Validators.required],
      collegeContact: [ this.isEditMode ? data.college.collegeContact :'', Validators.required],
      totalStudents: [ this.isEditMode ?  data.college.totalStudents : '', Validators.required],
      totalBranches: [ this.isEditMode ? data.college.totalBranches : '', Validators.required],
      visitedStatus: [  this.isEditMode ? data.college.visitedStatus : 'Not Visited'],
      visitedPlanDate: [  this.isEditMode ?  data.college.visitedPlanDate : new Date()],
      websiteLink: [  this.isEditMode ?  data.college.websiteLink : ''],
      companiesVisited: [  this.isEditMode ?  data.college.companiesVisited : []]
    });
  }

  ngOnInit(): void {
  }

 
 // Submit the form (for create or edit)
 onSubmit(): void {
  if (this.collegeForm.valid) {
    if (this.isEditMode) {
      this.updateCollege(this.data.college._id,this.collegeForm.value);
    } else {
      this.createCollege(this.collegeForm.value);
      
    }
  }
}

// Create new college
updateCollege(Id: string, updatedCollegeData: any): void {
  this.isLoading = true;
  this.collegeDataService.updateCollgeData(Id, updatedCollegeData).subscribe(
  () => {
      this.isLoading = false;
      this.toastr.success('User Updated successfully.', 'Success', {
      timeOut: 3000, 
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true
    });
    this.dialogRef.close(updatedCollegeData);
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

createCollege(newUser: any): void {
  console.log("newuser", newUser);
  this.isLoading = true;
  this.collegeDataService.saveCollegeData(newUser).subscribe(
    () => {
      this.isLoading = false;
      this.toastr.success('collegeData save successfully.', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
      this.dialogRef.close(newUser); 
    },
    (error) => {
      console.error('Error save collegeData :', error);
      this.toastr.error('Error saving collegeData. Please try again.', 'Error', {
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
