import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../model/language';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'http://localhost:8080/api/films'; // Adjust the base URL as needed
  
  constructor(private http: HttpClient) { }
  
  // Add a new film
  addFilm(film: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/post`, film, {responseType:'text'});
  }
  
  // Delete a film by ID
  deleteFilmById(filmId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${filmId}`,{responseType:'text'});
  }
  
  getLanguages() : Observable<any> {
    return this.http.get(`${this.apiUrl}/language/all`);
  }
  // Get all films
  getAllFilms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl,{responseType:'json'});
  }

  // Update film title
  updateTitle(id: number, title: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/title/${id}`, title,{responseType:'json'});
  }

  // Update film release year
  updateReleaseYear(id: number, year: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/releaseyear/${id}`, year,{responseType:'json'});
  }

  // Update film rental duration
  updateRentalDuration(id: number, rentalDuration: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/rentalduration/${id}`, rentalDuration,{responseType:'json'});
  }

  // Update film rental rate
  updateRentalRate(id: number, rentalRate: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/rentalrate/${id}`, rentalRate,{responseType:'json'});
  }

  // Update film rating
  updateRating(id: number, rating: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/rating/${id}`, rating,{responseType:'json'});
  }

  // Update film language
  updateLanguage(id: number, langId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/language/${id}`, langId, {responseType:'json'});
  }

  // Assign actors to a film
  assignActorsToFilm(filmId: number, actorIds: any[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${filmId}/actors`, actorIds, {responseType:'json'});
  }

  // Update film category
  updateCategory(id: number, categoryId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/category/${id}`, categoryId, {responseType:'json'});
  }

  
  findFilmById(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/filmId/${id}`);
  }

  // Find film by title
  findFilmsByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/title/${title}`);
  }
 
  // Find films by release year
  findFilmsByReleaseYear(releaseYear: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/year/${releaseYear}`);
  }
 
  // Find films where rental duration is greater
  findFilmsWhereRentalDurationIsGreater(rd: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/duration/gt/${rd}`);
  }
 
  // Find films where rental rate is greater
  findFilmsWhereRentalRateIsGreater(rate: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rate/gt/${rate}`);
  }
 
  // Find films where length is greater
  findFilmsWhereLengthIsGreater(length: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/length/gt/${length}`);
  }
 
  // Find films where rental duration is lower
  findFilmsWhereRentalDurationIsLower(rd: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/duration/lt/${rd}`);
  }
 
  // Find films where rental rate is lower
  findFilmsWhereRentalRateIsLower(rate: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rate/lt/${rate}`);
  }
 
  // Find films where length is lower
  findFilmsWhereLengthIsLower(length: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/length/lt/${length}`);
  }
 
  // Find films between years
  findFilmBetweenYear(from: number, to: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/betweenyear/${from}/${to}`);
  }
 
  // Find films where rating is lower
  findFilmsWhereRatingIsLower(rating: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rating/lt/${rating}`);
  }
 
  // Find films where rating is higher
  findFilmsWhereRatingIsHigher(rating: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rating/gt/${rating}`);
  }
 
  // Find films by language
  findFilmsByLanguage(lang: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/language/${lang}`);
  }
 
  // Display number of films by year
  displayFilmsNumberByYear(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.apiUrl}/countbyyear`);
  }
  


}