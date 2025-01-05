import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private baseUrl = 'http://localhost:8080/api/inventory'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Add a new film to inventory
  addInventory(inventory: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, inventory);
  }

  // Get all film inventories
  getAllInventories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/films`);
  }

  // Get inventories by store ID
  getInventoriesByStore(storeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/store/${storeId}`);
  }

  // Get inventories by film ID
  getInventoriesByFilm(filmId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/film/${filmId}`);
  }

  // Get inventory by film ID and store ID
  getInventoryByFilmAndStore(filmId: number, storeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/film/${filmId}/store/${storeId}`);
  }
}
