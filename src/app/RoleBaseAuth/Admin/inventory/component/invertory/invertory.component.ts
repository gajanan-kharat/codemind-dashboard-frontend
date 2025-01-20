import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DISPLAYED_COLUMNS_INVENTORY, INVENTORYISSUES } from 'src/app/models/admin-content';
import { InventoryService } from 'src/app/services/inventory.service';
import { EditInventoryComponent } from '../../dialogs/edit-inventory/edit-inventory.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-invertory',
  templateUrl: './invertory.component.html',
  styleUrls: ['./invertory.component.scss']
})
export class InvertoryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredInventoryData = new MatTableDataSource<any>();
  role: string | null = '';
  inventoryInfo: any[] = [];
  // statusCounts: any[] = [];
  isLoading: Boolean = false;

  topItems = INVENTORYISSUES;
  displayedColumns = DISPLAYED_COLUMNS_INVENTORY;
  selectedName = '';

  statusCounts = new BehaviorSubject<any[]>([]);
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  totalRecords: number = 0;

  constructor(private inventoryService: InventoryService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.role = localStorage.getItem('user_role');
    // this.fetchInventory();
  }

  ngOnInit(): void {
    this.fetchInventory();
  }

  ngAfterViewInit() {
    this.filteredInventoryData.sort = this.sort;
    this.inventoryService.booleanSubject.subscribe(value => {
      if (value == true) {
        this.fetchInventory();
      }
    });
  }

  onClick(name: string) {
    this.selectedName = name;
    this.currentPage = 1;
    this.fetchInventory();
    this.filteredInventoryData.paginator = this.paginator;
  }

  fetchInventory(searchTerm: string = ''): void {
    this.isLoading = true;
    const filters = {
      status: this.selectedName || '',
    };
    this.inventoryService.getInventoryData(this.currentPage, this.limit, searchTerm, filters).subscribe(
      (response: any) => {
        this.isLoading = false;
        const { totalRecords, totalPages, currentPage, data, statusCounts } = response;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.inventoryInfo = data;
        this.totalRecords = totalRecords;
        this.filteredInventoryData.data = this.inventoryInfo;
        // this.statusCounts = statusCounts;

        // Emit new value to BehaviorSubject
        this.statusCounts.next(statusCounts);

        // Access the latest statusCounts inside the loop
        this.topItems.forEach(item => {
          const currentStatusCounts = this.statusCounts.getValue(); 
          const statusCount = currentStatusCounts.find(status => status.status === item.name);

          if (statusCount) {
            item.count = statusCount.count;
          }
        });
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching Inventory:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchInventory();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.fetchInventory(filterValue);
  }

  refreshData() {
    this.inventoryInfo = [];
    this.filteredInventoryData.data = [];
    this.selectedName = '';
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
    this.fetchInventory();
  }

  editInventory(inventory: any) {
    const dialogRef = this.dialog.open(EditInventoryComponent, {
      width: '50%',
      data: { inventory },
      maxWidth: '80vw',
      minWidth: '300px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.inventoryInfo.findIndex(s => s._id === inventory._id);
        if (index !== -1) {
          this.inventoryInfo[index] = result;
          this.fetchInventory();
          this.inventoryService.booleanSubject.next(true);
        }
      }
    });
  }

  deleteInventory(inventory: any) {
    this.inventoryService.deleteInventoryData(inventory._id).subscribe(
      () => {
        this.toastr.success('Inventory Data deleted successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
        this.fetchInventory();
        this.inventoryService.booleanSubject.next(true);
      },
      (error) => {
        console.error('Error deleting inventory Data :', error);
        this.toastr.error('Error deleting inventory Data . Please try again.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        })
      }
    );
  }

  addNewInventory() {
    const dialogRef = this.dialog.open(EditInventoryComponent, {
      width: '50%',
      data: { inventory: null },
      // maxWidth: '80vw',
      // minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryInfo.push(result);
        this.fetchInventory();
        this.inventoryService.booleanSubject.next(true);
      }
    });
  }

}
