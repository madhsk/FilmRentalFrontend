import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:8080/api/stores';

  constructor(private http: HttpClient) {}

  getAllStores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  addStore(store: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, store,{responseType:'text'});
  }

  assignAddressToStore(storeId: number, addressId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${storeId}/address/${addressId}`, {});
  }

  getStoresByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/city/${city}`);
  }

  getStoresByCountry(country: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/country/${country}`);
  }

  getStoreByPhone(phone: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/phone/${phone}`);
  }

  updateStorePhoneNumber(storeId: number, phone: string): Observable<any> {
    const encodedPhone = encodeURIComponent(phone);  // Encode the phone number
    return this.http.put(`${this.apiUrl}/update/${storeId}/${encodedPhone}`,  {}, { responseType: 'text' });
  }
  

  getStaffByStoreId(storeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/staff/${storeId}`);
  }

  getCustomersByStore(storeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/customer/${storeId}`);
  }

  getManagerDetailsByStoreId(storeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/manager/${storeId}`);
  }

  getAllManagersAndStores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/managers`);
  }

  assignManagerToStore(storeId: number, managerStaffId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${storeId}/manager/${managerStaffId}`, {});
  }
}
