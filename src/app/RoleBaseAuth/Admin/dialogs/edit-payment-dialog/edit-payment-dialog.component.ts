import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, takeUntil, window } from 'rxjs';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-edit-payment-dialog',
  templateUrl: './edit-payment-dialog.component.html',
  styleUrls: ['./edit-payment-dialog.component.scss']
})
export class EditPaymentDialogComponent {
  @Input() isIntereseted: boolean = false;
  @Input() formGroup!: FormGroup;
  // @Output() formDataChange = new EventEmitter<any>(); 
  private destroy$ = new Subject<void>();

  isLoading: Boolean = false;
  paymentForm!: FormGroup;
  transactionWay: string = '';
  username: string | null = '';
  screenshotUrl: string | null = null;


  constructor(
    public dialogRef: MatDialogRef<EditPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private mongodbService: MongodbService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
      this.paymentForm = this.formBuilder.group({
      totalFees: [{ value:data.student.totalFees, disabled: true}, [Validators.required, Validators.min(0)]],
      course: [ { value:data.student.course, disabled: true}, Validators.required],
      paidFees: [, Validators.required],
      installment: ['',],
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      discountComment: [''],
      reference: ['', [Validators.min(0),Validators.required]],
      referenceComment: [''], 
      remainingFees: [{ value: 0, disabled: true },Validators.required],
      paymentStatus: ['Not Paid',Validators.required],
      paymentDate: [new Date(),Validators.required],
      transactionWay: ['',Validators.required ],
      transactionId: ['',],
      bankName: ['', ],
      cashReceiverName: [''],
      screenshot: [null,Validators.required] 
    });

    if (data.student && data.student.payments && data.student.payments.length > 0) {
      const lastPayment = data.student.payments[data.student.payments.length - 1];

      this.paymentForm.patchValue({
        totalFees: data.student.totalFees || 20000,
        course: data.student.course || '',
        paidFees: lastPayment.paidFees || 0,
        installment: lastPayment.installment || '',
        discountPercentage: lastPayment.discountPercentage || 0,
        discountComment: lastPayment.discountComment || '',
        reference: lastPayment.reference || 0,
        referenceComment: lastPayment.referenceComment || '', 
        remainingFees: lastPayment.remainingFees || 0,
        paymentStatus: lastPayment.paymentStatus || 'Not Paid',
        paymentDate: lastPayment.paymentDate || new Date(),
        transactionWay: lastPayment.transactionWay || '',
        transactionId: lastPayment.transactionId || '',
        bankName: lastPayment.bankName || '',
        cashReceiverName:lastPayment.cashReceiverName || '',
      });

      console.log('Last Payment Data:', lastPayment);
    } else {
      console.error('No payment data available');
    }
    this.onChanges();
    
  }
  ngOnInit(): void {
    // this.paymentForm.valueChanges.pipe(
    //   debounceTime(300),           // Wait for 300ms after the last change
    //   takeUntil(this.destroy$)     // Automatically unsubscribe when destroy$ emits
    // ).subscribe(value => {
    //   if (this.paymentForm.valid) {
    //     this.formDataChange.emit(value);  // Emit the form data to the parent component
    //   } else {
    //     this.paymentForm.markAllAsTouched(); // Mark all controls as touched if invalid
    //   }
    // });
    // if (this.paymentForm.valid) {
    // this.formDataChange.emit(this.paymentForm.value);
    // }
    // else{
    //   this.paymentForm.markAllAsTouched();
    // }
    if (this.data.student && this.data.student.payments && this.data.student.payments.length > 0) {
      const lastPayment = this.data.student.payments[this.data.student.payments.length - 1];
      const transactionWayFromDB = lastPayment.transactionWay;
      const mockEvent = { value: transactionWayFromDB };
      this.onTransactionWayChange(mockEvent);

      // this.screenshotUrl = lastPayment.screenshot;
    } else {
      const defaultTransactionWay = ''; 
      const mockEvent = { value: defaultTransactionWay };
      this.onTransactionWayChange(mockEvent);
    }
  }

  // Expose the raw form values (including disabled fields) to the parent
  get form() {
    return this.paymentForm.getRawValue();
  }

  // Expose the form validity to the parent
  get isValid() {
    return this.paymentForm.valid;
  }

  // Trigger form validation for all fields
  markFormTouched() {
    this.paymentForm.markAllAsTouched();
  }

  onTransactionWayChange(event: any): void {
    this.transactionWay = event.value; 
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  } 

  onChanges(): void {
    this.paymentForm.get('paidFees')?.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.calculateRemainingFees();
      this.updatePaymentStatus();
      // this.emitFormData(); // Emit form data including remainingFees
    });

    this.paymentForm.get('remainingFees')?.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.calculateRemainingFees();
      this.updatePaymentStatus();
      // this.emitFormData();
    });
    
    this.paymentForm.get('discountPercentage')?.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.calculateRemainingFees();
      // this.emitFormData(); 
    });

    this.paymentForm.get('totalFees')?.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.calculateRemainingFees();
      this.updatePaymentStatus();
      // this.emitFormData(); 
    });

    this.paymentForm.get('reference')?.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.calculateRemainingFees();
      //  this.emitFormData();
    });
  }

  /*private emitFormData(): void {
    const remainingFees = this.paymentForm.get('remainingFees')?.value;
    const totalFees = this.paymentForm.get('totalFees')?.value;
    const course = this.paymentForm.get('course')?.value;
    const username =  localStorage.getItem('user_fullName');
    if (this.paymentForm.valid) {
    this.formDataChange.emit({ ...this.paymentForm.value, remainingFees , username, totalFees, course});
    }else{
      this.paymentForm.markAllAsTouched();
    }
  }*/

  calculateRemainingFees(): void {
    const totalFees = this.paymentForm.get('totalFees')?.value;
    const paidFees = this.paymentForm.get('paidFees')?.value;
    const discountPercentage = this.paymentForm.get('discountPercentage')?.value;
    const referenceDiscount = this.paymentForm.get('reference')?.value;

    const discountAmount = (totalFees * discountPercentage) / 100;
    const finalFees = totalFees - discountAmount - referenceDiscount;

    const remainingFees = finalFees - paidFees;
    this.paymentForm.get('remainingFees')?.setValue(remainingFees < 0 ? 0 : remainingFees);
  }

  updatePaymentStatus(): void {
    const totalFees = this.paymentForm.get('totalFees')?.value;
    const paidFees = this.paymentForm.get('paidFees')?.value;
    const remainingFees = this.paymentForm.get('remainingFees')?.value;

    if (paidFees >= totalFees || remainingFees === 0) {
      this.paymentForm.get('paymentStatus')?.setValue('Completed');
    } else if (paidFees > 0 && remainingFees !== 0) {
      this.paymentForm.get('paymentStatus')?.setValue('Partially Paid');
    } else {
      this.paymentForm.get('paymentStatus')?.setValue('Not Paid');
    }
  }

  /*onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.screenshotUrl = fileReader.result as string; 
        this.paymentForm.get('screenshot')?.setValue(this.screenshotUrl); 
      };
      fileReader.readAsDataURL(file);
    }
  
  }*/

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const blob = new Blob([file], { type: file.type });
        this.screenshotUrl = URL.createObjectURL(blob); 
        console.log("Url :=>", blob);
        this.paymentForm.get('screenshot')?.setValue(this.screenshotUrl);
      };
      fileReader.readAsArrayBuffer(file); 
    }
  }

  deleteScreenshot(): void {
    this.screenshotUrl = null; 
    this.paymentForm.get('screenshot')?.setValue(null); 
    const fileInput = document.getElementById('screenshot') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; 
    }
  }
    
  onSave() {
    this.isLoading = true;
    if (this.paymentForm.valid) {
      const paymentData = {
        username: localStorage.getItem('user_fullName'),
        paidFees: this.paymentForm.get('paidFees')?.value,
        totalFees: this.paymentForm.get('totalFees')?.value,
        course: this.paymentForm.get('course')?.value,
        installment: this.paymentForm.get('installment')?.value,
        discountPercentage: this.paymentForm.get('discountPercentage')?.value,
        discountComment: this.paymentForm.get('discountComment')?.value,
        reference: this.paymentForm.get('reference')?.value,
        referenceComment: this.paymentForm.get('referenceComment')?.value,
        remainingFees: this.paymentForm.get('remainingFees')?.value,
        paymentStatus: this.paymentForm.get('paymentStatus')?.value,
        paymentDate: this.paymentForm.get('paymentDate')?.value,
        transactionWay: this.paymentForm.get('transactionWay')?.value,
        transactionId: this.paymentForm.get('transactionId')?.value,
        cashReceiverName: this.paymentForm.get('cashReceiverName')?.value,
        bankName: this.paymentForm.get('bankName')?.value,
        screenshot: this.paymentForm.get('screenshot')?.value   
      };

      const finalData = {
        _id: this.data.student._id,
        payments: [paymentData]
      };

      console.log(finalData);

      this.mongodbService.updateStudentPayment(finalData).subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success('Payment information saved successfully');
          this.dialogRef.close(response);
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error('Error saving payment information');
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.screenshotUrl) {
      URL.revokeObjectURL(this.screenshotUrl);
    }
        // Emit a value to complete all the subscriptions
        this.destroy$.next();
        this.destroy$.complete();  // Ensure the subject is completed
    
  }
  
}
