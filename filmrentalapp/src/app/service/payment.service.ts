import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payment'; // Base API URL

  constructor(private http: HttpClient) {}


  createOrder(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-order`, { amount });  // Sending as JSON { amount: number }
  }

  // Verify payment method: Pass the payment details as received from Razorpay
  verifyPayment(paymentDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, paymentDetails);  // Sending the payment verification details
  }
  // Get revenue datewise
  getRevenueDatewise(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/revenue/datewise`,{responseType:'json'});
  }

  // Get revenue by store ID (datewise)
  getRevenueByStoreDatewise(storeId: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/revenue/datewise/store/${storeId}`,{responseType:'json'});
  }

  // Get revenue filmwise
  getRevenueFilmwise(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/revenue/filmwise`,{responseType:'json'});
  }

  // Get revenue by film ID (storewise)
  getRevenueByFilmStorewise(filmId: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/revenue/film/${filmId}`,{responseType:'json'});
  }

  // Get revenue by films in a store
  getRevenueFilmsByStore(storeId: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/revenue/films/store/${storeId}`,{responseType:'json'});
  }
}
