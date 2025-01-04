
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../model/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:8080/api/rentals';

  constructor(private http: HttpClient) {}
  getRentals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  getRentalsByCustomer(customerId: number): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  getTopTenFilms(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/toptenfilms`);
  }

  getTopTenFilmsByStore(storeId: number): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/toptenfilms/store/${storeId}`);
  }

  getPendingReturnsByStore(storeId: number): Observable<Map<number, string>> {
    return this.http.get<Map<number, string>>(`${this.apiUrl}/due/store/${storeId}`);
  }

  addRental(rental: Rental): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, rental,{responseType:'text'});
  }

  updateReturnDate(id: number, returnDate: { returnDate: string }): Observable<Rental> {
    return this.http.put<Rental>(`${this.apiUrl}/update/returndate/${id}`, returnDate);
  }
}
