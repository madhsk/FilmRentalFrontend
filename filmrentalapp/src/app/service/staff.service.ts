import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private baseUrl = 'http://localhost:8080/api/staff';

  constructor(private http: HttpClient) {}

  getStores(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/stores/all',{responseType: 'json'});
  }
  
  getAddresses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alladdress`,{ responseType: 'json' });
  }

  addStaff(staff: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/create`, staff, { responseType: 'text' });
  }

  findByLastName(lastName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lastname/${lastName}`, { responseType: 'json' });
  }

  findByFirstName(firstName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/firstname/${firstName}`, { responseType: 'json' });
  }

  findByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/email/${email}`, { responseType: 'json' });
  }

  findByCity(city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/city/${city}`, { responseType: 'json' });
  }

  findByCountry(country: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/country/${country}`, { responseType: 'json' });
  }

  findByPhoneNumber(phone: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/phone/${phone}`, { responseType: 'json' });
  }

  updateFirstName(id: number, firstName: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/firstName/${id}`, firstName, { responseType: 'json' });
  }

  updateLastName(id: number, lastName: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/lastName/${id}`, lastName, { responseType: 'json' });
  }

  updateEmail(id: number, email: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/email/${id}`, email, { responseType: 'json' });
  }

  updatePhoneNumber(id: number, phoneNumber: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/phone/${id}`, phoneNumber, { responseType: 'json' });
  }

  assignAddressToStaff(staffId: number, address: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/address/${staffId}`, address, { responseType: 'json' });
  }

  updateStore(id: number, store: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/update-store`, store, { responseType: 'json' });
  }

  getAllStaff():Observable<any>{
    return this.http.get(`${this.baseUrl}/allstaff`,{ responseType: 'json' });
  }

  deleteStaff(staffId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${staffId}`);
  }
}
