import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { MongodbService } from 'src/app/services/mongodb.service';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { StudentMockInfo } from 'src/app/models/studentMockInformation';
import { ToastrService } from 'ngx-toastr';
import { MockNumber, MockStatuses } from 'src/app/models/mock';

interface Mock {
  mockNumber: number;
  mockDate: Date;
  mockTime: string;
  mockStatus: string;
  feedback: string;
}
@Component({
  selector: 'app-edit-studentmock-dialog',
  templateUrl: './edit-studentmock-dialog.component.html',
  styleUrls: ['./edit-studentmock-dialog.component.scss']
})
export class EditStudentmockDialogComponent {
  studentMockForm!: FormGroup;
  years: number[] = [];
  batches: string[] = [];
  courses = Object.values(Course);
  mockNumbers = Object.values( MockNumber );
  mockStatuses = Object.values(MockStatuses);

  constructor(
    public dialogRef: MatDialogRef<EditStudentmockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ student: StudentMockInfo },
    private fb: FormBuilder,
    private mongodbService: MongodbService,
    private toastr: ToastrService
  ) {
    this.initializeYears();
    this.initializeBatches();
  }

  ngOnInit(): void {
    this.studentMockForm = this.fb.group({
      name: [this.data.student.name, Validators.required],
      email: [this.data.student.email, [Validators.required, Validators.email]],
      contactNo: [this.data.student.contactNo, Validators.required],
      course: [this.data.student.course, Validators.required],
      batch: [this.data.student.batch, Validators.required],
      graduation: [this.data.student.graduation, Validators.required],
      passingYear: [this.data.student.passingYear, Validators.required],
      mocks: this.fb.array(this.data.student.mocks ? this.data.student.mocks.map((mock: Mock) => this.createMock(mock)) : [])
    });
  }

  get mocks(): FormArray {
    return this.studentMockForm.get('mocks') as FormArray;
  }

  createMock(mock: Mock): FormGroup {
    return this.fb.group({
      mockNumber: [mock.mockNumber, Validators.required],
      mockDate: [mock.mockDate, Validators.required],
      mockTime: [mock.mockTime, Validators.required],
      mockStatus: [mock.mockStatus, Validators.required ],
      feedback: [mock.feedback]
    });
  }

  addMock(): void {
    this.mocks.push(this.createMock({ mockNumber: 1, mockDate: new Date(), mockTime: '', mockStatus: '', feedback: '' }));
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  initializeBatches() {
    for (let i = 1; i <= 13; i++) {
      this.batches.push(`Batch-${i}`);
    }
  }

  onSave(): void {
    if (this.studentMockForm.valid) {
      const updatedStudentMock = { ...this.data.student, ...this.studentMockForm.value };
      this.mongodbService.updateStudentMock(updatedStudentMock).subscribe(
        () => {
          this.toastr.success('Student Mock Information Updated successfully.', 'Success', {
            timeOut: 3000, 
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
          this.dialogRef.close(updatedStudentMock);
        },
        (error) => {
          console.error('Error updating student:', error);
          this.toastr.error('Error Updating Student Mock Information. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true
          });
        }
      );
    } else{
      this.studentMockForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
}