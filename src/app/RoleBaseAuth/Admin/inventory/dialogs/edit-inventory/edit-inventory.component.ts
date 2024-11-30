import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent {
  inventoryForm: FormGroup;
  isEditMode: boolean = false;
  isLoading:Boolean = false;
  issueStatus = ['Working','Facing Issue','In Progress','Solved'];
  returned =["Returned","Not Return"];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<EditInventoryComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.inventory; 
    this.inventoryForm = this.fb.group({
      firstName: [data?.inventory?.firstName || '', Validators.required],
      lastName: [data?.inventory?.lastName || '', Validators.required],
      mobileNumber: [data?.inventory?.mobileNumber || '', Validators.required],
      email: [data?.inventory?.email || '', [Validators.required, Validators.email]],
      jobTitle: [data?.inventory?.jobTitle || '', Validators.required],
      address: [data?.inventory?.address || ''],
      inventoryDetails: this.fb.array(
        data?.inventory?.inventoryDetails?.map((detail: any) =>
          this.fb.group({
            inventoryName: [detail.inventoryName || '', Validators.required],
            modelName: [detail.modelName || '', Validators.required],
            inventoryAssignedDate: [detail.inventoryAssignedDate || new Date(), Validators.required],
            issueDescription: [detail.issueDescription || '', Validators.required],
            issueDate: [detail.issueDate || null],
            assignedTo: [detail.assignedTo || ''],
            status: [detail.status || 'No Issue'],
            resolvedDate: [detail.resolvedDate || null],
            resolutionComment: [detail.resolutionComment || ''],
            returned: [detail.returned || 'Not Return'],
            returnDate: [detail.returnDate || null],
            returncomment: [detail.returncomment || ''],
          })
        ) || []
      ),
    });
  }

  get inventoryDetails(): FormArray {
    return this.inventoryForm.get('inventoryDetails') as FormArray;
  }

  addInventoryDetail() {
    this.inventoryDetails.push(
      this.fb.group({
        inventoryName: ['', Validators.required],
        modelName: ['', Validators.required],
        inventoryAssignedDate: [new Date(), Validators.required],
        issueDescription: [''],
        issueDate: [null],
        assignedTo: [''],
        status: ['No Issue'],
        resolvedDate: [null],
        resolutionComment: [''],
        returned: ['Not Return'],
        returnDate: [null],
        returncomment: [''],
      })
    );
  }

  save() {
    if (this.inventoryForm.valid) {
      this.isLoading = true;
      if (this.isEditMode) {
        this.isLoading = true;
        this.inventoryService.updateInventoryData(this.data.inventory._id, this.inventoryForm.value).subscribe(
          () => {
            this.toastr.success('Inventory updated successfully!', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.dialogRef.close(true);
          },
          (error) => {
            this.toastr.error('Failed to update inventory.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.isLoading = false;
          }
        );
      } else {
        this.isLoading = true;
        this.inventoryService.saveInventoryData(this.inventoryForm.value).subscribe(
          () => {
            this.toastr.success('Inventory saved successfully!', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.dialogRef.close(true);
          },
          (error) => {
            this.toastr.error('Failed to save inventory.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true
            });
            this.isLoading = false;
          }
        );
      }
    }
  }
  
  // Close the dialog without saving
 onCancel(): void {
  this.dialogRef.close();
}

}
