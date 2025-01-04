import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";
import { AdminProfileComponent } from "../admin-profile/admin-profile.component";
import { ActorService } from '../../../service/actor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Actor } from '../../../model/actor';
@Component({
  selector: 'app-actor',
  imports: [AdminNavbarComponent, AdminProfileComponent, FormsModule, CommonModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent {
  newActor:Actor = {
    firstName: '',
    lastName: '',
    actorId: null,
    lastUpdate: ''
  }; // Object to hold new actor details

  actorId: any  = null ; // Actor ID for updates
  updatedLastName: string = ''; // New last name
  updatedFirstName: string = ''; // New first name
  filmIds: number[] = [];
  filmIdInput: string = ''; // For capturing individual film IDs before adding them to the list
  message: string = ''; // Message to display success/error

  constructor(private actorService: ActorService) {}

  addActor(): void {
    if (!this.newActor.firstName || !this.newActor.lastName) {
      this.message = 'Please fill in all fields to add an actor.';
      return;
    }
  
    // Remove actorId from the payload
    const actorToAdd = {
      firstName: this.newActor.firstName,
      lastName: this.newActor.lastName,
      lastUpdate: this.newActor.lastUpdate || new Date().toISOString(), // Add last update as current timestamp
    };
  
    this.actorService.addActor(actorToAdd).subscribe(
      (response) => {
        this.message = response; // Success message from server
        this.newActor = { firstName: '', lastName: '', actorId: null, lastUpdate: '' }; // Reset form
      },
      (error) => {
        this.message = 'Error adding actor: ' + error.error.message;
      }
    );
  }
  

  updateLastName(): void {
    if (this.actorId <= 0 || !this.updatedLastName) {
      this.message = 'Please provide a valid Actor ID and last name.';
      return;
    }

    this.actorService.updateLastName(this.actorId, this.updatedLastName).subscribe(
      () => {
        this.message = 'Actor last name updated successfully.';
        this.updatedLastName = ''; // Reset input
      },
      (error) => {
        this.message = 'Error updating last name: ' + error.error;
      }
    );
  }

  updateFirstName(): void {
    if (this.actorId <= 0 || !this.updatedFirstName) {
      this.message = 'Please provide a valid Actor ID and first name.';
      return;
    }

    this.actorService.updateFirstName(this.actorId, this.updatedFirstName).subscribe(
      () => {
        this.message = 'Actor first name updated successfully.';
        this.updatedFirstName = ''; // Reset input
      },
      (error) => {
        this.message = 'Error updating first name: ' + error.error;
      }
    );
  }

  addFilmId() {
    const filmId = parseInt(this.filmIdInput);
    console.log(this.filmIds); // Check if filmIds array contains only numbers
    if (!isNaN(filmId)) {
      this.filmIds.push(filmId);
      this.filmIdInput = ''; // Clear input after adding
    } else {
      this.message = 'Please enter a valid film ID.';
      this.filmIdInput = ''; // Clear invalid input
    }
  }
  

  assignFilms() {
    if (this.actorId && this.filmIds.length > 0) {
      this.actorService.assignFilmToActor(this.actorId, this.filmIds).subscribe(
        (response) => {
          this.message = response; // Success message from the server
          this.filmIds = []; // Clear the film IDs after successful assignment
        },
        (error) => {
          // Handle error and extract a meaningful message
          if (error.error && typeof error.error === 'string') {
            this.message = `Error: ${error.error}`;
          } else if (error.error && error.error.message) {
            this.message = `Error: ${error.error.message}`;
          } else {
            this.message = 'An unknown error occurred.';
          }
        }
      );
    } else {
      this.message = 'Please provide a valid actor ID and at least one film ID.';
    }
  }
  
}
