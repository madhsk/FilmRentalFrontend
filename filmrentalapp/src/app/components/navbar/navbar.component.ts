import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-navbar1',
  imports: [CommonModule,FormsModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent1 {
  showProfileForm : boolean = false;
  constructor(private router:Router){}
    isAuthenticated(){
      if(localStorage.getItem('token')){
        return true;
      }else{
        return false;
      }
     }
     staffDetail(){
      this.router.navigate(['/staff-detail']);
     }
    logout(){
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('role');
      this.router.navigate(["/app-login"]);
    }
}
