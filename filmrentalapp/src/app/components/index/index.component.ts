import { Component } from '@angular/core';
import { NavbarComponent1 } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-index',
  imports: [NavbarComponent1,CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
  
})
export class IndexComponent {
constructor (private router: Router){}
isAuthenticated(){
  if(localStorage.getItem('token')){
    return true;
  }else{
    return false;
  }
 }
exploreServices(){
    if(localStorage.getItem('token'))
      {
    this.router.navigate(['/staff-film']);
      }
      else
      {
        this.router.navigate(['/app-login']);
      }
  }
  Rent(){
    if(localStorage.getItem('token'))
    {
  this.router.navigate(['/staff-film']);
    }
    else
    {
      this.router.navigate(['/app-login']);
    }
}

}
