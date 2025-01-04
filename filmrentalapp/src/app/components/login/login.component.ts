import { Component } from '@angular/core';
import { Login } from '../../model/login';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent1 {
  token: any;
  username: any;
  errorMessage: string | null = null;

  constructor(private authservice: AuthService, private router: Router) {}

  // Method to handle login
  loginuser() {
    // Ensure valid inputs
    if (!this.login.userName || !this.login.password) {
      this.errorMessage = 'Username and Password are required.';
      return;
    }

    this.login.role = 'ROLE_STAFF'; // Default role

    this.authservice.loginAdmin(this.login).subscribe(
      (response) => {
        // Parse response and handle successful login
        this.token = response?.token;
        this.username = response?.username; // Adjust path based on API response structure

        if (this.token) {
          // Store token and username in local/session storage
          localStorage.setItem('token', this.token);
          sessionStorage.setItem('token', this.token);
          sessionStorage.setItem('username', this.username);
          sessionStorage.setItem('role',this.login.role);
          
          this.errorMessage = null;
          this.router.navigate(["/staff-film"]);
        }
      },
      (error) => {
        // Handle errors from the API
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error:', error);
      }
    );
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Login object
  login: Login = {
    userName: '',
    password: '',
    role: ''
  };
}
