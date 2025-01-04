import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/Customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer',
  imports:[CommonModule,FormsModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  showCreateCustomerForm: boolean = false;
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  newCustomer: Customer={
    //customerId: 0,
    firstName: '',
    lastName: '',
    email: '',
    active: false,
    address: undefined,
    store: undefined,
    createDate: '',
    lastUpdate: ''
  }
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchActiveCustomers();
  }

  fetchActiveCustomers(): void {
    this.customerService.getActiveCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching active customers:', err);
      },
    });
  }

  fetchAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching all customers:', err);
      },
    });
  }

  createCustomer(newCustomer: Customer): void {
    this.customerService.createCustomer(newCustomer).subscribe({
      next: () => {
        alert('Customer created successfully!');
        this.fetchActiveCustomers();
      },
      error: (err) => {
        console.error('Error creating customer:', err);
        alert('Failed to create customer.');
      },
    });
  }

  updateCustomerFirstName(customerId: number, newFirstName: string): void {
    this.customerService.updateFirstName(customerId, newFirstName).subscribe({
      next: () => {
        alert('Customer information updated successfully!');
        this.fetchActiveCustomers();
      },
      error: (err) => {
        console.error('Error updating customer:', err);
        alert('Failed to update customer.');
      },
    });
  }

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        alert('Customer deleted successfully!');
        this.fetchActiveCustomers();
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
        alert('Failed to delete customer.');
      },
    });
  }
}
