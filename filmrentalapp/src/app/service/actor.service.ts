import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private baseUrl = 'http://localhost:8080/api/actors'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  addActor(actor: any): Observable<string> {
    const url = `${this.baseUrl}/post`;
    return this.http.post(url, actor, { responseType: 'text' });
  }

  updateLastName(actorId: number, lastName: string): Observable<any> {
    const url = `${this.baseUrl}/update/lastname/${actorId}`;
    return this.http.put(url, { lastName });
  }

  updateFirstName(actorId: number, firstName: string): Observable<any> {
    const url = `${this.baseUrl}/update/firstname/${actorId}`;
    return this.http.put(url, { firstName });
  }

  assignFilmToActor(actorId: number, filmIds: number[]): Observable<string> {
    return this.http.put(`${this.baseUrl}/${actorId}/film`, filmIds, {
      responseType:'text'
    });
  }
}
