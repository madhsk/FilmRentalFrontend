import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
 
  AUTH_URL:string="http://localhost:8080/api/";
  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
   }

  
  registerUser(user:any) : Observable<any> {
   return this.httpClient.post(this.AUTH_URL + "admin/register", user,{responseType:'text'});
  }
  registerStaff(user:any) : Observable<any>{
    return this.httpClient.post(this.AUTH_URL + "user/register", user,{responseType:'text'});
  }
  loginAdmin(user:any):Observable<any>{
    return this.httpClient.post(this.AUTH_URL+"auth",user,{responseType:'json'});
  }
  getDataService(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post(this.AUTH_URL + 'getMessage', null, {headers});
  }
}
