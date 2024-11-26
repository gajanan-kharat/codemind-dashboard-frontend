import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CollegeDataService } from 'src/app/services/college-data.service';
import { EditCollegeInfoComponent } from '../../../collegeData-section/dialogs/edit-college-info/edit-college-info.component';
import { COURSES, BATCHES } from 'src/app/models/admin-content';
import { StudentIssueService } from 'src/app/services/student-issue.service';

@Component({
  selector: 'app-edit-new-issues',
  templateUrl: './edit-new-issues.component.html',
  styleUrls: ['./edit-new-issues.component.scss']
})
export class EditNewIssuesComponent {
  studentIssueForm!: FormGroup;
  isEditMode: boolean;
  isLoading:Boolean = false;
  courses = COURSES;
  batches = BATCHES; 
  issueStatus = ['New Issue','In Progress','Block','Resolve'];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCollegeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private collegeDataService: CollegeDataService,
    private toastr: ToastrService,
    private studentIssueService: StudentIssueService
  ) {


    this.isEditMode = !!data && !!data.student;

    // Initialize the form
    this.studentIssueForm = this.fb.group({
      firstName: [ this.isEditMode ? data.student.firstName : '', Validators.required],
      lastName: [ this.isEditMode ? data.student.lastName : '', Validators.required],
      mobileNumber: [ this.isEditMode ?  data.student.mobileNumber : '', Validators.required],
      email: [this.isEditMode ? data.student.email : '', Validators.required],
      course: [ this.isEditMode ?  data.student.course : '', Validators.required],
      batch: [this.isEditMode ?  data.student.batch : '', Validators.required],
      description: [this.isEditMode ?  data.student.description : '', Validators.required],
      source: [ this.isEditMode ? data.student.source :'', Validators.required],
      issue_created_date: [ this.isEditMode ? data.student.issue_created_date : new Date(), Validators.required],
      issueStatus: [ this.isEditMode ? data.student.issueStatus :'', Validators.required],
      technicalExpert: this.fb.group({
        technicalExpertName: [this.isEditMode ? this.data.student.technicalExpert.technicalExpertName: '', Validators.required],
        issue_assigned_date: [this.isEditMode ? this.data.student.technicalExpert.issue_assigned_date : new Date(), Validators.required],
      })
    });
  }

  ngOnInit(): void {
    
  }
 
 // Submit the form (for create or edit)
 onSubmit(): void {
  if (this.studentIssueForm.valid) {
    if (this.isEditMode) {
      this.updateStudentIssues(this.data.student._id,this.studentIssueForm.value);
    } else {
      this.createStudentIssues(this.studentIssueForm.value);
      
    }
  }
}

// Update Student Issues
updateStudentIssues(Id: string, studentIssuesData: any): void {
  this.isLoading = true;
  this.studentIssueService.updateStudentIssuesData(Id, studentIssuesData).subscribe(
  () => {
      this.isLoading = false;
      this.toastr.success('Student Issues data Updated successfully.', 'Success', {
      timeOut: 3000, 
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true
    });
    this.dialogRef.close(studentIssuesData);
  },
  (error) => {
  
    console.error('Error updating student:', error);
    this.toastr.error('Error Updating Student Issues data. Please try again.', 'Error', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true
    });
  }
);
}

// Create new Student Issues
createStudentIssues(newStudentIssue: any): void {
  // console.log("newuser", newUser);
  this.isLoading = true;
  this.studentIssueService.saveStudentIssuesData(newStudentIssue).subscribe(
    () => {
      this.isLoading = false;
      this.toastr.success('Student Issues data save successfully.', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
      this.dialogRef.close(newStudentIssue); 
    },
    (error) => {
      console.error('Error save Student Issues data :', error);
      this.toastr.error('Error saving Student Issues data. Please try again.', 'Error', {
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
