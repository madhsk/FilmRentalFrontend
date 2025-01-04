import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../service/rental.service';
import { Rental } from '../../model/rental';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental',
  imports: [CommonModule, FormsModule],
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  showAddRental: boolean = false;
  rentals: Rental[] = [];
  topFilms: Rental[] = [];
  topFilmsByStore: Rental[] = [];
  selectedRentalId: number | null = null;  // Declare the selected rental ID
  returnDate: string = '';  // Declare the return date
  errorMessage: string = '';
  pendingReturns: Map<number, string> | null= new Map();

  customerId: number = 1; // Default value, change as needed
  storeId: number = 1; // Default value, change as needed
  newRental: Rental = {
    //rentalId: 0,
    rentalDate: '',
    inventory: { inventoryId: '', film: { title: '' } },
    customer: { customerId: '' },
    returnDate: '',
    staff: { staffId: '' },
    lastUpdate: ''
  };

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentalsByCustomer();
    this.getTopTenFilms();
    this.getPendingReturnsByStore();
    this.getRentals();
  }
    // Method to fetch rentals (replace `1` with the actual customer ID as needed)
    getRentals(): void {
      this.rentalService.getRentalsByCustomer(1).subscribe((data) => {
        this.rentals = data;
        console.log(data);
      }, error => {
        console.error('Error fetching rentals:', error);
      });
    }
  
    selectRental(rentalId: number | undefined): void {
      if (rentalId != null) {
        this.selectedRentalId = rentalId;
      } else {
        console.error("Rental ID is undefined.");
      }
    }
  
    // Method to update return date for the selected rental
    updateReturnDate(): void {
      if (this.selectedRentalId != null && this.returnDate) {
        // Correct way to pass the returnDate as an object
        this.rentalService.updateReturnDate(this.selectedRentalId, { returnDate: this.returnDate }).subscribe(
          (response) => {
            console.log('Return date updated successfully:', response);
            this.getRentals();  // Refresh the list after the update
          },
          (error) => {
            console.error('Error updating return date:', error);
            this.errorMessage = 'Error updating return date. Please try again.';
          }
        );
      } else {
        console.error('Rental ID or Return Date is missing.');
        this.errorMessage = 'Please select a rental and set the return date.';
      }
    }
    

  // Method to fetch rentals for a specific customer
  getRentalsByCustomer(): void {
    this.rentalService.getRentalsByCustomer(this.customerId).subscribe((data) => {
      this.rentals = data;
      console.log(data);
    }, error => {
      console.error('Error fetching rentals:', error);
    });
  }

  // Method to fetch the top 10 films rented across all stores
  getTopTenFilms(): void {
    this.rentalService.getTopTenFilms().subscribe((data) => {
      this.topFilms = data;
      console.log(data);
    }, error => {
      console.error('Error fetching top films:', error);
    });
  }

  // Method to fetch the top 10 films rented in a specific store
  getTopTenFilmsByStore(): void {
    this.rentalService.getTopTenFilmsByStore(this.storeId).subscribe((data) => {
      this.topFilmsByStore = data;
      console.log(data);
    }, error => {
      console.error('Error fetching top films for store:', error);
    });
  }

  // Method to fetch customers with pending returns for a specific store
  getPendingReturnsByStore(): void {
    this.rentalService.getPendingReturnsByStore(this.storeId).subscribe((data) => {
      const convertedMap: Map<number, string> = new Map();
      for (const [key, value] of Object.entries(data)) {
        convertedMap.set(Number(key), value as string);
      }
      this.pendingReturns = convertedMap;

      
    }, error => {
      console.error('Error fetching pending returns:', error);
    });
  }

  // Method to add a new rental (Create Rental)
  addRental(): void {
    this.rentalService.addRental(this.newRental).subscribe((response) => {
      console.log('Rental added:', response);
      this.getRentalsByCustomer(); // Refresh rental list
    }, error => {
      console.error('Error adding rental:', error);
    });
  }

  // Method to reset the form
  resetNewRental(): void {
    this.newRental = {
      rentalId: 0,
      rentalDate: '',
      inventory: { inventoryId: '', film: { title: '' } },
      customer: { customerId: '' },
      returnDate: '',
      staff: { staffId: '' },
      lastUpdate: ''
    };
  }
  
}

