import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../service/payment.service';
import { AdminProfileComponent } from "../admin-profile/admin-profile.component";
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [AdminProfileComponent, AdminNavbarComponent, FormsModule, CommonModule],
})
export class AdminDashboardComponent implements OnInit {
  storeId: number | null = null;
  filmId: number | null = null;
  storeIdFilm: number | null = null;
  storeIdFilms: number | null = null;

  // Properties to hold data
  revenueDatewise: Map<string, number> | null = null;
  revenueByStoreDatewise: Map<string, number> | null = null;
  revenueFilmwise: Map<string, number> | null = null;
  revenueByFilmStorewise: Map<string, number> | null = null;
  revenueFilmsByStore: Map<string, number> | null = null;

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    // Optionally, load default data or initialize the page here
  }

  // Fetch datewise revenue
  viewRevenueDatewise() {
    console.log('Fetching Datewise Revenue:');

    this.paymentService.getRevenueDatewise().subscribe(
      (data) => {
        console.log('Datewise Revenue:', data);
        this.revenueDatewise = data;
      },
      (error) => {
        console.error('Error fetching datewise revenue:', error);
      }
    );
  }

  // Fetch revenue for a specific store (datewise)
  viewRevenueByStoreDatewise() {
    if (this.storeId === null) {
      console.error('Store ID is required');
      return;
    }

    console.log('Fetching Revenue By Store Datewise for Store ID:', this.storeId);

    this.paymentService.getRevenueByStoreDatewise(this.storeId).subscribe(
      (data) => {
        console.log('Revenue By Store Datewise:', data);
        this.revenueByStoreDatewise = data;
      },
      (error) => {
        console.error('Error fetching revenue by store datewise:', error);
      }
    );
  }

  // Fetch filmwise revenue
  
  viewRevenueFilmwise() {
    console.log('Fetching Filmwise Revenue');

    this.paymentService.getRevenueFilmwise().subscribe(
      (data) => {
        console.log('Filmwise Revenue:', data);
        this.revenueFilmwise = data;
      },
      (error) => {
        console.error('Error fetching filmwise revenue:', error);
      }
    );
  }

  // Fetch revenue for a film in a specific store
  viewRevenueByFilmStorewise() {
    if (this.filmId === null || this.storeIdFilm === null) {
      console.error('Film ID and Store ID are required');
      return;
    }

    console.log('Fetching Revenue By Film Storewise for Film ID:', this.filmId, 'Store ID:', this.storeIdFilm);

    this.paymentService.getRevenueByFilmStorewise(this.filmId).subscribe(
      (data) => {
        console.log('Revenue By Film Storewise:', data);
        this.revenueByFilmStorewise = data;
      },
      (error) => {
        console.error('Error fetching revenue by film storewise:', error);
      }
    );
  }

  // Fetch revenue for all films in a store
  viewRevenueFilmsByStore() {
    if (this.storeIdFilms === null) {
      console.error('Store ID is required');
      return;
    }

    console.log('Fetching Revenue Films By Store for Store ID:', this.storeIdFilms);

    this.paymentService.getRevenueFilmsByStore(this.storeIdFilms).subscribe(
      (data) => {
        console.log('Revenue Films By Store:', data);
        this.revenueFilmsByStore = data;
      },
      (error) => {
        console.error('Error fetching revenue films by store:', error);
      }
    );
  }
}
