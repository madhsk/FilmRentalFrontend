import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { Staff } from '../../model/staff';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-staff1',
  imports: [CommonModule,FormsModule],
  templateUrl: './staff1.component.html',
  styleUrl: './staff1.component.css'
})
export class Staff1Component implements OnInit {
  
  stores: any[] = [];
  addresses: any[] = [];
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
  constructor(private staffService: StaffService, private router:Router) {}

  ngOnInit(): void {
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
 
addStaff() {
    this.staffService.addStaff(this.newStaff).subscribe(
      response => {
        alert('Staff added successfully!');
        this.resetAddStaffForm();
        this.router.navigate(['/staff-detail']);
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
 }
}
