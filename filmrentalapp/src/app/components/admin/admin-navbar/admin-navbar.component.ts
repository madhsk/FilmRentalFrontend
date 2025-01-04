import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  username1: string | null = ''; // Declare username1

  isCollapsed: boolean = false;

  // ngOnInit lifecycle hook
  ngOnInit(): void {
    // Get username from localStorage
    this.username1 = sessionStorage.getItem('username');
    
    // Debugging log to check if the username is correctly fetched from localStorage
    console.log('Username from localStorage:', this.username1);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
