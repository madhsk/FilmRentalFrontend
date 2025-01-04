import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/customers/';
  constructor(private http: HttpClient) {}

  // Get all active customers
  getActiveCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl+'active',{responseType:'json'});
  }

  // Get all customers (active or inactive)
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  // Get a customer by ID
  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+`${customerId}`);
  }
  
  
  // Create a new customer
  createCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.baseUrl, customer);
  }

  // Update a customer's first name
  updateFirstName(customerId: number, firstName: string): Observable<any> {
    return this.http.put(this.baseUrl+`${customerId}/first-name`, { firstName });
  }

  // Update a customer's last name
  updateLastName(customerId: number, lastName: string): Observable<any> {
    return this.http.put(this.baseUrl+`${customerId}/last-name`, { lastName });
  }

  // Update a customer's email
  updateEmail(customerId: number, email: string): Observable<any> {
    return this.http.put(this.baseUrl+`${customerId}/email`, { email });
  }

  // Update a customer's phone number
  updatePhoneNumber(customerId: number, phone: string): Observable<any> {
    return this.http.put(this.baseUrl+`${customerId}/phone`, { phone });
  }

  // Update customer status (active/inactive)
  updateCustomerStatus(customerId: number, status: boolean): Observable<any> {
    return this.http.put(this.baseUrl+`${customerId}/status`, { active: status });
  }

  // Delete a customer by ID
  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(this.baseUrl+`${customerId}`);
  }

  // Get a customer by email (useful for login or searching)
  getCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+`email/${email}`);
  }
}
