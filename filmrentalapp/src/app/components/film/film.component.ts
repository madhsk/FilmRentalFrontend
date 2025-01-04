import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { Film } from '../../model/film';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent1 } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-film',
  imports: [FormsModule, CommonModule, NavbarComponent1, RouterModule],
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'], // Optional: Add your styles here
})
export class FilmComponent1 implements OnInit {
  films: Film[] = [];
  selectedMethod: string = '';
  inputValue: string | number = '';
  showInputField: boolean = false;
  inputLabel: string = '';
  selectedFilm: Film | null = null; // To hold the selected film details

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getAllFilms();
  }

  getAllFilms(): void {
    this.filmService.getAllFilms().subscribe((data: Film[]) => {
      this.films = data;
    });
  }

  onMethodChange(): void {
    this.showInputField = true; // Show the input field when a method is selected
    switch (this.selectedMethod) {
      case 'title':
        this.inputLabel = 'Enter Title';
        break;
      case 'releaseYear':
        this.inputLabel = 'Enter Release Year';
        break;
      case 'rentalDurationGreater':
        this.inputLabel = 'Enter Rental Duration (greater than)';
        break;
      case 'rentalRateGreater':
        this.inputLabel = 'Enter Rental Rate (greater than)';
        break;
      case 'rentalRateLower':
        this.inputLabel = 'Enter Rental Rate (lower than)';
        break;
      case 'lengthGreater':
        this.inputLabel = 'Enter Length (greater than)';
        break;
      case 'lengthLower':
        this.inputLabel = 'Enter Length (lower than)';
        break;
      case 'ratingLower':
        this.inputLabel = 'Enter Rating (lower than)';
        break;
      case 'ratingHigher':
        this.inputLabel = 'Enter Rating (higher than)';
        break;
      case 'language':
        this.inputLabel = 'Enter Language';
        break;
      case 'betweenYears':
        this.inputLabel = 'Enter Years (e.g., 2000, 2020)';
        break;
      default:
        this.showInputField = false; // Hide input field if no valid method is selected
    }
  }

  performSearch(): void {
    switch (this.selectedMethod) {
      case 'title':
        this.filmService.findFilmsByTitle(this.inputValue as string).subscribe((data: Film) => {
          this.films = data ? [data] : []; // Wrap single film in an array
        });
        break;
      case 'releaseYear':
        this.filmService.findFilmsByReleaseYear(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'rentalDurationGreater':
        this.filmService.findFilmsWhereRentalDurationIsGreater(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'rentalRateGreater':
        this.filmService.findFilmsWhereRentalRateIsGreater(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'rentalRateLower':
        this.filmService.findFilmsWhereRentalRateIsLower(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'lengthGreater':
        this.filmService.findFilmsWhereLengthIsGreater(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'lengthLower':
        this.filmService.findFilmsWhereLengthIsLower(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'ratingLower':
        this.filmService.findFilmsWhereRatingIsLower(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'ratingHigher':
        this.filmService.findFilmsWhereRatingIsHigher(this.inputValue as number).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'language':
        this.filmService.findFilmsByLanguage(this.inputValue as string).subscribe((data: Film[]) => {
          this.films = data;
        });
        break;
      case 'betweenYears':
        const years = this.inputValue.toString().split(',').map(year => parseInt(year.trim(), 10));
        if (years.length === 2) {
          this.filmService.findFilmBetweenYear(years[0], years[1]).subscribe((data: Film[]) => {
            this.films = data;
          });
        }
        break;
      default:
        // Handle case where no valid method is selected
        this.films = [];
    }
  }

  selectFilm(film: Film): void {
    this.selectedFilm = film; // Set the selected film to display its details
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating); // 5 stars total
  }
  
  // goToPayment(): void {
  //   if (this.selectedFilm) {
  //     this.router.navigate(['/payment/']);
  //   } else {
  //     alert('Please select a film to proceed to payment.');
  //   }
  // }
}