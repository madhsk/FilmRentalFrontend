import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../service/store.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { Store } from '../../../model/store';
import { StaffService } from '../../../service/staff.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent, AdminProfileComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  stores: Store[] = []; // Use the Store model for type safety
  addresses: any[] = [];
  managers:any[]=[];
  newStore: Store = {
    // storeId: 0,
    address: undefined,
    manager: undefined,
    lastUpdate: '',
    staffList: [],
    customers: []
  };
  cityFilter: string = '';
  countryFilter: string = '';
  phoneNumber: string = '';
  storeId: number | null = null;
  addressId: number | null = null;
  managerStaffId: number | null = null;
  managersAndStores: any[] = [];
  staffByStoreId: any[] = [];
  customersByStoreId: any[] = [];
  message: string = '';

  constructor(private storeService: StoreService, private staffService: StaffService) {}

  ngOnInit(): void {
    this.getAllStores();
    this.loadAddresses();
    this.loadStaff();
  }

  loadAddresses() {
    this.staffService.getAddresses().subscribe(
      (data) => {
        this.addresses = data;
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }
  loadStaff(){
    this.staffService.getAllStaff().subscribe(
      (data) => {
        this.managers = data;
      },
      (error) => {
        console.error('Error fetching staff:', error);
      }
    );
  }
  // Fetch all stores
  getAllStores() {
    this.storeService.getAllStores().subscribe(
      (data) => {
        this.stores = data;
        console.log(this.stores)
      },
      (error) => {
        this.message = 'Error fetching stores!';
      }
    );
  }

  // Add a new store
  addStore() {
    console.log(this.newStore)
    this.storeService.addStore(this.newStore).subscribe(
      (data) => {
        this.message = data;
        this.getAllStores();
      },
      (error) => {
        console.log(error);
        this.message = 'Error adding store!';
      }
    );
  }

  // Assign an address to a store
  assignAddressToStore() {
    if (this.storeId && this.addressId) {
      this.storeService.assignAddressToStore(this.storeId, this.addressId).subscribe(
        (data) => {
          this.message = 'Address assigned successfully!';
          this.getAllStores();
        },
        (error) => {
          this.message = 'Error assigning address!';
        }
      );
    } else {
      this.message = 'Store ID and Address ID are required!';
    }
  }

  // Filter stores by city
  filterByCity() {
    if (this.cityFilter) {
      this.storeService.getStoresByCity(this.cityFilter).subscribe(
        (data) => {
          this.stores = data;
        },
        (error) => {
          this.message = 'Error filtering stores by city!';
        }
      );
    } else {
      this.message = 'City filter cannot be empty!';
    }
  }

  // Filter stores by country
  filterByCountry() {
    if (this.countryFilter) {
      this.storeService.getStoresByCountry(this.countryFilter).subscribe(
        (data) => {
          this.stores = data;
          console.log(data);
        },
        (error) => {
          this.message = 'Error filtering stores by country!';
        }
      );
    } else {
      this.message = 'Country filter cannot be empty!';
    }
  }

  // Update store phone number
  updateStorePhone() {
    if (this.storeId && this.phoneNumber) {
      this.storeService.updateStorePhoneNumber(this.storeId, this.phoneNumber).subscribe(
        (data) => {
          this.message = data;
          this.getAllStores();
        },
        (error) => {
          console.error('Error occurred:', error);  // Log the full error response
          this.message = `Error updating phone number: ${error.message || error.error}`;
        }
      );
    } else {
      this.message = 'Store ID and Phone Number are required!';
    }
  }
  

  // Fetch all managers and stores
  getAllManagersAndStores() {
    this.storeService.getAllManagersAndStores().subscribe(
      (data) => {
        this.managersAndStores = data;
      },
      (error) => {
        this.message = 'Error fetching managers and stores!';
      }
    );
  }

  // Assign a manager to a store
  assignManagerToStore() {
    if (this.storeId && this.managerStaffId) {
      this.storeService.assignManagerToStore(this.storeId, this.managerStaffId).subscribe(
        (data) => {
          this.message = 'Manager assigned successfully!';
          this.getAllStores();
        },
        (error) => {
          this.message = 'Error assigning manager!';
        }
      );
    } else {
      this.message = 'Store ID and Manager Staff ID are required!';
    }
  }
}
