import { Component, Inject ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CollegeDataService } from 'src/app/services/college-data.service';
import { EditCollegeInfoComponent } from '../../../collegeData-section/dialogs/edit-college-info/edit-college-info.component';
import { ScholarshipService } from 'src/app/services/scholarship.service';
import { BATCHES, COURSES, FEEDBACK_OPTIONS } from 'src/app/models/admin-content';
import { EditPaymentDialogComponent } from '../../../dialogs/edit-payment-dialog/edit-payment-dialog.component';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-edit-scholarship',
  templateUrl: './edit-scholarship.component.html',
  styleUrls: ['./edit-scholarship.component.scss']
})
export class EditScholarshipComponent {
  
  @ViewChild(EditPaymentDialogComponent) childFormComponent!: EditPaymentDialogComponent;
  scholarshipForm: FormGroup;
  isEditMode: boolean;
  isLoading:Boolean = false;
  visitedStatusOptions = ['Scholarship','In Progress','Selected','Rejected'];
  feedback=['Excellent','Good','Average','Poor'];
  selectedScholarshipStatus : string = 'Scholarship';
  courses = COURSES;
  batches = BATCHES;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditScholarshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private scholarshipDataService: ScholarshipService,
    private mongodbService: MongodbService,
    private toastr: ToastrService,
  ) {


    this.isEditMode = !!data && !!data.student;

    // Initialize the form
    this.scholarshipForm = this.fb.group({
      name: [ this.isEditMode ? data.student.name : '', Validators.required],
      collegeName: [ this.isEditMode ?  data.student.collegeName : '', Validators.required],
      mobileNumber: [ this.isEditMode ?  data.student.mobileNumber : '', Validators.required],
      email: [this.isEditMode ? data.student.email : '', Validators.required],
      graduationMarks: [this.isEditMode ? data.student.graduationMarks : '', Validators.required],
      hscMarks: [  this.isEditMode ?  data.student.hscMarks : '', Validators.required],
      sscMarks: [  this.isEditMode ?  data.student.sscMarks : '', Validators.required],
      address: [ this.isEditMode ?  data.student.address : '', Validators.required],
      course: [ this.isEditMode ?  data.student.course : '', Validators.required],
      batch: [this.isEditMode ?  data.student.batch : '', Validators.required],
      scholarshipStatus: [ this.isEditMode ?  data.student.scholarshipStatus : 'Scholarship', Validators.required],
      scholarshipScore: [  this.isEditMode ?  data.student.scholarshipScore : ''],
      interviewFeedback: [  this.isEditMode ?  data.student.interviewFeedback : ''],
      source: [ this.isEditMode ? data.student.source :'', Validators.required],
      date: [ this.isEditMode ? data.student.date : new Date(), Validators.required],
      sourcecomment: [  this.isEditMode ? data.student.sourcecomment : ''],
    });
  }

  ngOnInit(): void {
  }

  onScholarshipStatusChange(value: string): void {
    this.selectedScholarshipStatus  = value; 
    console.log("scholarship status:=>", this.selectedScholarshipStatus);
  }
 
 // Submit the form (for create or edit)
 onSubmit(): void {
  if (this.scholarshipForm.valid) {
    // console.log("data",this.scholarshipForm.value);
    if (this.isEditMode) {
      this.updateScholarship(this.data.student._id,this.scholarshipForm.value);
    } else {
      this.createScholarship(this.scholarshipForm.value);
      
    }
  }
}

// Create new scholarship data
/*updateScholarship(Id: string, updatedScholarData: any): void {
  const scholarshipStatus = this.scholarshipForm.get('scholarshipStatus')?.value;
  this.isLoading = true;
  if (scholarshipStatus != 'Selected') {
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
}*/


updateScholarship(Id: string, updatedScholarData: any): void {
  if (this.scholarshipForm.valid) {
    const scholarshipStatus = this.scholarshipForm.get('scholarshipStatus')?.value;
   
    // When the Scholarship Status is not "Selected"
   if (scholarshipStatus != 'Selected') {
     console.log("this.interestedForm.value",this.scholarshipForm.value);
      this.scholarshipDataService.updateScholarshipData(Id, updatedScholarData)
        .subscribe(
          (updatedStudent) => {
            this.toastr.success('Updated Scolarship Student Data successfully.', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.dialogRef.close(updatedStudent); 
          },
          (error) => {
            this.toastr.error('Error updating Interested Student Data. Please try again.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            console.error('Error updating student:', error);
          }
        );
    }
    // When the Scholarship Status is "Selected"
    if (scholarshipStatus === 'Selected') {
      this.childFormComponent.markFormTouched();
      if (this.childFormComponent.isValid) {
         const formValues = this.childFormComponent.form;
         const username = localStorage.getItem('user_fullName'); 
         const payment = {
          ...formValues,  
          username: username 
        };
         const payments = [ payment]; 
         const name = this.scholarshipForm.value.name || "";
         const [firstName, lastName] = name.split(" ");
        //  console.log("Scholarship Payments:=>",payments);
         const confirmedStudentData = {
          ...this.scholarshipForm.value,
          firstName: firstName || "", 
          lastName: lastName || "",   
          payments, 
      };

      console.log("Scholarship confirmedStudentData :=>",confirmedStudentData);
      // Save student data in another table (e.g., a "Confirmed Students" table)
      this.mongodbService.saveConfirmedStudent(confirmedStudentData)
        .subscribe(
          (savedStudent) => {
            // If successful, remove the student from the "Interested" table
            this.scholarshipDataService.deleteScholarshipData(this.data.student._id)
              .subscribe(
                () => {
                  this.toastr.success('Scholarship Student confirmed and moved to Confirmed table.', 'Success', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    progressBar: true,
                    closeButton: true
                  });
                  this.dialogRef.close(savedStudent); 
                },
                (error) => {
                  this.toastr.error('Error removing  student from Scholarship table. Please try again.', 'Error', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    progressBar: true,
                    closeButton: true
                  });
                  console.error('Error deleting Scholarship student:', error);
                }
              );
          },
          (error) => {
            this.toastr.error('Error saving Confirmed Scholarship Student Data. Please try again.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            console.error('Error saving confirmed student:', error);
          }
        );
      }
    }
  }
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
