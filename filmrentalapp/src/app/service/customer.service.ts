import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/customers';
  constructor(private http: HttpClient) {}

  // Get all active customers
  getActiveCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl+'/active',{responseType:'json'});
  }

  // Get all customers (active or inactive)
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  // Get a customer by ID
  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+`/${customerId}`);
  }
  
  
  // Create a new customer
  createCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.baseUrl+'/post', customer, {responseType:'json'});
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

  // Get a customer by email (useful for login or searching)
  getCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+`/email/${email}`);
  }

  /**
   * Search customers by last name
   * @param lastName - The last name to search for
   */
  searchByLastName(lastName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lastname/${lastName}`);
  }

  /**
   * Search customers by first name
   * @param firstName - The first name to search for
   */
  searchByFirstName(firstName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/firstname/${firstName}`);
  }

  /**
   * Search customers by email
   * @param email - The email to search for
   */
  searchByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/email/${email}`);
  }

  /**
   * Search customers by phone number
   * @param phone - The phone number to search for
   */
  searchByPhone(phone: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/phone/${phone}`);
  }

  /**
   * Search customers by city name
   * @param city - The city name to search for
   */
  searchByCity(city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/city/${city}`);
  }

  /**
   * Search customers by country name
   * @param country - The country name to search for
   */
  searchByCountry(country: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/country/${country}`);
  }



  /**
   * Get all inactive customers
   */
  getInactiveCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/inactive`);
  }
}
