import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/Customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent1 } from '../navbar/navbar.component';
import { StaffService } from '../../service/staff.service';
@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule,NavbarComponent1],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  searchType: string = '';
  searchValue: string = '';
  customers: any[] = [];
  showNoResults: boolean = false;
  showCreateCustomerForm: boolean = false;
  // customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  stores: any[] = [];
  addresses: any[] = [];

  newCustomer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    active: false,
    address: undefined,
    store: undefined,
    createDate: '',
    lastUpdate: '',
  };

  constructor(private customerService: CustomerService, private staffService: StaffService) {}

  ngOnInit(): void {
    this.fetchActiveCustomers(); 
    this.loadAddresses();
    this.loadStores(); 
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

  fetchActiveCustomers(): void {
    this.customerService.getActiveCustomers().subscribe({
      next: (data: Customer[]) => {
        console.log(data)
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching active customers:', err);
      },
    });
  }

  createCustomer(): void {
    const newCustomerCopy = { ...this.newCustomer };
    this.customerService.createCustomer(newCustomerCopy).subscribe({
      next: (data: Customer) => {
        alert('Customer created successfully!');
        //this.customers.push(data);
        this.resetForm();
      },
      error: (err) => {
        console.log(this.newCustomer);
        console.error('Error creating customer:', err);
        alert('Failed to create customer.');
      },
    });
  }

  resetForm(): void {
    this.newCustomer = {
      firstName: '',
      lastName: '',
      email: '',
      active: false,
      address: {
        phone: '',
        city: {
          cityName: '',
          country: {
            countryName: '',
          },
        },
      },
      store: undefined,
      createDate: '',
      lastUpdate: '',
    };
    this.showCreateCustomerForm = false;
    this.selectedCustomer = null;
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
    this.newCustomer = { ...customer };
    this.showCreateCustomerForm = true;
  }
  requiresInput(): boolean {
    // Return false for 'active' and 'inactive' as they don't require input
    return this.searchType !== 'active' && this.searchType !== 'inactive';
  }

  searchCustomers(): void {
    this.showNoResults = false;
    this.customers = [];

    if (this.searchType === 'lastname') {
      this.customerService.searchByLastName(this.searchValue).subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else if (this.searchType === 'firstname') {
      this.customerService.searchByFirstName(this.searchValue).subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else if (this.searchType === 'email') {
      this.customerService.searchByEmail(this.searchValue).subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else if (this.searchType === 'phone') {
      this.customerService.searchByPhone(this.searchValue).subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else if (this.searchType === 'city') {
      this.customerService.searchByCity(this.searchValue).subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else if (this.searchType === 'country') {
      this.customerService.searchByCountry(this.searchValue).subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else if (this.searchType === 'active') {
      this.customerService.getActiveCustomers().subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else if (this.searchType === 'inactive') {
      this.customerService.getInactiveCustomers().subscribe(
        (data) => (this.customers = data),
        (error) => console.error(error)
      );
    } else {
      console.error('Invalid search type.');
    }

    // Show "No Results Found" message if no customers are returned
    setTimeout(() => {
      if (this.customers.length === 0) {
        this.showNoResults = true;
      }
    }, 500);
  }
}
