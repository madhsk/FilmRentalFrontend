import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";
import { AdminProfileComponent } from "../admin-profile/admin-profile.component";
import { FormsModule } from '@angular/forms';
import { StaffService } from '../../../service/staff.service';
import { CommonModule } from '@angular/common';
import { Staff } from '../../../model/staff';

@Component({
  selector: 'app-staff',
  imports: [AdminNavbarComponent, AdminProfileComponent, FormsModule, CommonModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'] // Fixed from styleUrl to styleUrls
})
export class StaffComponent implements OnInit {
  staffList: any[] = [];
  stores: any[] = [];
  addresses: any[] = [];
  searchCriteria = '';
  searchValue = '';
  message = '';
  selectedField: string = '';
  updateValue: string = '';
  showAddStaffForm: boolean = false;
  newStaff: Staff = {
    staffId: 0,
    firstName: '',
    lastName: '',
    email: '',
    store: {}, // Ensure this is handled in your form
    address: {} // Ensure this is handled in your form
    ,
    username: '',
    password: '',
    active: false
  };

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.refreshStaffList(); // Load staff list on initialization
    this.loadStores();
    this.loadAddresses();
  }
  loadStores() {
    this.staffService.getStores().subscribe(
      (data) => {
        this.stores = data;
      },
      (error) => {
        console.error('Error fetching stores:', error);
      }
    );
  }
  
  // Load addresses from the backend
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

  searchStaff(): void {
    switch (this.searchCriteria) {
      case 'lastName':
        this.staffService.findByLastName(this.searchValue).subscribe(
          (data) => (this.staffList = data),
          (error) => console.error(error)
        );
        break;
      case 'firstName':
        this.staffService.findByFirstName(this.searchValue).subscribe(
          (data) => (this.staffList = data),
          (error) => console.error(error)
        );
        break;
      case 'email':
        this.staffService.findByEmail(this.searchValue).subscribe(
          (data) => (this.staffList = data),
          (error) => console.error(error)
        );
        break;
      case 'city':
        this.staffService.findByCity(this.searchValue).subscribe(
          (data) => (this.staffList = data),
          (error) => console.error(error)
        );
        break;
      case 'country':
        this.staffService.findByCountry(this.searchValue).subscribe(
          (data) => (this.staffList = data),
          (error) => console.error(error)
        );
        break;
      case 'phone':
        this.staffService.findByPhoneNumber(this.searchValue).subscribe(
          (data) => (this.staffList = data),
          (error) => console.error(error)
        );
        break;
      default:
        console.error('Invalid search criteria');
    }
  }

  resetSearch(): void {
    this.searchCriteria = '';
    this.searchValue = '';
    this.staffList = [];
    this.message = '';
  }

  updateStaff(staffId: number) {
    if (!this.selectedField || !this.updateValue) {
      alert('Please select a field and enter a new value.');
      return;
    }

    switch (this.selectedField) {
      case 'firstName':
        this.staffService.updateFirstName(staffId, this.updateValue).subscribe(
          response => {
            alert('First Name updated successfully!');
            this.resetUpdateFields();
            this.refreshStaffList(); // Refresh the staff list to reflect changes
          },
          error => {
            alert('Error updating First Name: ' + error);
          }
        );
        break;
      case 'lastName':
        this.staffService.updateLastName(staffId, this.updateValue).subscribe (
          response => {
            alert('Last Name updated successfully!');
            this.resetUpdateFields();
            this.refreshStaffList();
          },
          error => {
            alert('Error updating Last Name: ' + error);
          }
        );
        break;
      case 'email':
        this.staffService.updateEmail(staffId, this.updateValue).subscribe(
          response => {
            alert('Email updated successfully!');
            this.resetUpdateFields();
            this.refreshStaffList();
          },
          error => {
            alert('Error updating Email: ' + error);
          }
        );
        break;
      case 'phone':
        this.staffService.updatePhoneNumber(staffId, this.updateValue).subscribe(
          response => {
            alert('Phone Number updated successfully!');
            this.resetUpdateFields();
            this.refreshStaffList();
          },
          error => {
            alert('Error updating Phone Number: ' + error);
          }
        );
        break;
      default:
        alert('Invalid field selected.');
    }
  }

  resetUpdateFields() {
    this.selectedField = '';
    this.updateValue = '';
  }

  addStaff() {
    this.staffService.addStaff(this.newStaff).subscribe(
      response => {
        alert('Staff added successfully!');
        this.resetAddStaffForm();
        this.refreshStaffList(); // Refresh the staff list to reflect changes
      },
      error => {
        alert('Error adding staff: ' + error);
      }
    );
  }

  // Method to reset the add staff form
  resetAddStaffForm() {
    this.newStaff = { // Create a new instance to reset the form
      staffId: 0,
      firstName: '',
      lastName: '',
      email: '',
      store: {},
      address: {},
      username: '',
    password: '',
    active: false
    };
    this.showAddStaffForm = false; // Hide the form
  }

  refreshStaffList() {
    this.staffService.getAllStaff().subscribe(
      data => {
        this.staffList = data;
      },
      error => {
        console.error('Error fetching staff list:', error);
      }
    );
  }

  // deleteStaff(staffId: number) {
  //   if (confirm('Are you sure you want to delete this staff member?')) {
  //     this.staffService.deleteStaff(staffId).subscribe(
  //       response => {
  //         alert('Staff deleted successfully!');
  //         this.refreshStaffList(); // Refresh the staff list to reflect changes
  //       },
  //       error => {
  //         alert('Error deleting staff: ' + error);
  //       }
  //     );
  //   }
  // }
}