import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../service/film.service';
import { Film } from '../../../model/film';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";
import { AdminProfileComponent } from "../admin-profile/admin-profile.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Language } from '../../../model/language';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  imports: [AdminNavbarComponent, FormsModule, AdminProfileComponent, CommonModule]
})
export class FilmComponent implements OnInit {
  films: Film[] = [];
  languages: Language[] = [];
  newFilm: Film = {
    filmId: null,
    title: '',
    description: '',
    release_year: 0,
    language: undefined,
    rental_duration: 0,
    rental_rate: 0,
    length: 0,
    replacement_cost: 0,
    rating: 0,
    special_features: '',
    lastUpdate: ''
  };
  selectedField = ''; // Field to update
  updateValue = ''; // Value for the update
  selectedFilmId: number | null = null; // Film ID for updates
  showAddFilmForm = false; // Control Add Film form visibility
  searchCriteria = ''; // Search field (e.g., title, year)
  searchValue = ''; // Search value

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.loadFilms();
    this.loadLanguage(); 
  }

  loadAddresses() {
    this.filmService.getLanguages().subscribe(
      (data) => {
        this.languages = data;
      },
      (error) => {
        console.error('Error fetching languages:', error);
      }
    );
  }

  loadFilms(): void {
    this.filmService.getAllFilms().subscribe(
      (data: Film[]) => {
        this.films = data;
      },
      error => {
        console.error('Error fetching films', error);
      }
    );
  }

  loadLanguage(): void{
    this.filmService.getLanguages().subscribe(
      (data) => {
        this.languages = data;
      },
      error => {
        console.error('Error fetching languages', error);
      }
    );
  }

  addFilm(): void {
    this.filmService.addFilm(this.newFilm).subscribe(
      response => {
        console.log('Film added:', response);
        this.loadFilms(); // Reload films after adding
        this.resetNewFilm(); // Reset the new film form
      },
      error => {
        console.error('Error adding film', error);
      }
    );
  }

  deleteFilm(filmId: number): void {
    this.filmService.deleteFilmById(filmId).subscribe(
      response => {
        console.log('Film deleted:', response);
        this.loadFilms(); // Reload films after deletion
      },
      error => {
        console.error('Error deleting film', error);
      }
    );
  }

  updateFilm(filmId: number): void {
    if (!this.selectedField || !this.updateValue) {
      alert('Please select a field and enter a new value.');
      return;
    }

    switch (this.selectedField) {
      case 'title':
        this.filmService.updateTitle(filmId, this.updateValue).subscribe(
          response => {
            alert('Title updated successfully!');
            this.resetUpdateFields();
            this.loadFilms(); // Refresh the films list
          },
          error => {
            alert('Error updating Title: ' + error.message);
          }
        );
        break;
      case 'releaseYear':
        this.filmService.updateReleaseYear(filmId, parseInt(this.updateValue, 10)).subscribe(
          response => {
            alert('Release Year updated successfully!');
            this.resetUpdateFields();
            this.loadFilms();
          },
          error => {
            alert('Error updating Release Year: ' + error.message);
          }
        );
        break;
      case 'rentalDuration':
        this.filmService.updateRentalDuration(filmId, parseInt(this.updateValue, 10)).subscribe(
          response => {
            alert('Rental Duration updated successfully!');
            this.resetUpdateFields();
            this.loadFilms();
          },
          error => {
            alert('Error updating Rental Duration: ' + error.message);
          }
        );
        break;
      case 'rentalRate':
        this.filmService.updateRentalRate(filmId, parseFloat(this.updateValue)).subscribe(
          response => {
            alert('Rental Rate updated successfully!');
            this.resetUpdateFields();
            this.loadFilms();
          },
          error => {
            alert('Error updating Rental Rate: ' + error.message);
          }
        );
        break;
      case 'rating':
        this.filmService.updateRating(filmId, parseFloat(this.updateValue)).subscribe(
          response => {
            alert('Rating updated successfully!');
            this.resetUpdateFields();
            this.loadFilms();
          },
          error => {
            alert('Error updating Rating: ' + error.message);
          }
        );
        break;
      case 'language':
        this.filmService.updateLanguage(filmId, parseInt(this.updateValue, 10)).subscribe(
          response => {
            alert('Language updated successfully!');
            this.resetUpdateFields();
            this.loadFilms();
          },
          error => {
            alert('Error updating Language: ' + error.message);
          }
        );
        break;
      default:
        alert('Invalid field selected.');
    }
  }

  resetUpdateFields(): void {
    this.selectedField = '';
    this.updateValue = '';
  }

  resetNewFilm(): void {
    this.newFilm = {
      filmId: 0,
      title: '',
      description: '',
      release_year: 0,
      language: undefined,
      rental_duration: 0,
      rental_rate: 0,
      length: 0,
      replacement_cost: 0,
      rating: 0,
      special_features: '',
      lastUpdate: ''
    };
  }
}
