import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { window } from 'rxjs';
import { MongodbService } from 'src/app/services/mongodb.service';

@Component({
  selector: 'app-edit-payment-dialog',
  templateUrl: './edit-payment-dialog.component.html',
  styleUrls: ['./edit-payment-dialog.component.scss']
})
export class EditPaymentDialogComponent {

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
      paidFees: [0, Validators.required],
      installment: ['',],
      discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      discountComment: [''],
      reference: [0, [Validators.min(0)]],
      referenceComment: [''], 
      remainingFees: [{ value: 0, disabled: true }],
      paymentStatus: ['Not Paid'],
      paymentDate: [new Date()],
      transactionWay: ['', ],
      transactionId: ['',],
      bankName: ['', ],
      cashReceiverName: [''],
      screenshot: [null] 
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
  onTransactionWayChange(event: any): void {
    this.transactionWay = event.value; 
    this.cdr.detectChanges();
  } 

  onChanges(): void {
    this.paymentForm.get('paidFees')?.valueChanges.subscribe(() => {
      this.calculateRemainingFees();
      this.updatePaymentStatus();
    });

    this.paymentForm.get('remainingFees')?.valueChanges.subscribe(() => {
      this.calculateRemainingFees();
      this.updatePaymentStatus();
    });
    
    this.paymentForm.get('discountPercentage')?.valueChanges.subscribe(() => {
      this.calculateRemainingFees();
    });

    this.paymentForm.get('totalFees')?.valueChanges.subscribe(() => {
      this.calculateRemainingFees();
      this.updatePaymentStatus();
    });

    this.paymentForm.get('reference')?.valueChanges.subscribe(() => {
      this.calculateRemainingFees();
    });
  }

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

  onFileSelected(event: Event): void {
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

      this.mongodbService.updateStudent(finalData).subscribe(
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
}
