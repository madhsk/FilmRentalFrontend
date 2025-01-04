import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent1 {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [['ROLE_STAFF'], Validators.required]
    });
  }
  message:string | undefined;
  showModal:boolean | undefined;
  

  register(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.authService.registerStaff(user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.message = 'User account created successfully!';
          this.showModal = true; // Show the modal
          setTimeout(() => {
            this.showModal = false;
            this.router.navigate(['/staff-detail']); // Redirect to login page after modal
          }, 1000); // Modal stays for 3 seconds before redirecting
        },
        (error) => {
          console.error('Error during registration:', error);
          this.message = 'Registration failed. Please try again.';
          this.showModal = true; // Show the modal
          setTimeout(() => {
            this.showModal = false;
          }, 3000); // Modal disappears after 3 seconds
        });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

}

