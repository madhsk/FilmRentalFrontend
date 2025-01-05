import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service';
import { NavbarComponent1 } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-inventory',
  imports: [NavbarComponent1,FormsModule,CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventories: any[] = [];
  newInventory: any = { filmId: '', storeId: '' };
  storeId: number | null = null;
  filmId: number | null = null;
  filmStoreInventories: any[] = [];
  message: string = '';
  storeIdForFilm: number | null = null;
  filmIdForStore: number | null = null;
  filmInventories: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.getAllInventories();
  }

  // Fetch all inventories
  getAllInventories(): void {
    this.inventoryService.getAllInventories().subscribe(
      (data) => {
        this.inventories = data;
      },
      (error) => {
        console.error('Error fetching inventories:', error);
      }
    );
  }

  // Add a new inventory
  addInventory(): void {
    this.inventoryService.addInventory(this.newInventory).subscribe(
      (data) => {
        this.message = 'Inventory added successfully!';
        this.getAllInventories();
      },
      (error) => {
        console.error('Error adding inventory:', error);
      }
    );
  }

  // Fetch inventories by store ID
  getInventoriesByStore(): void {
    if (this.storeId) {
      this.inventoryService.getInventoriesByStore(this.storeId).subscribe(
        (data) => {
          this.filmStoreInventories = data;
        },
        (error) => {
          console.error('Error fetching inventories by store:', error);
        }
      );
    }
  }

  // Fetch inventories by film ID
  getInventoriesByFilm(): void {
    if (this.filmId) {
      this.inventoryService.getInventoriesByFilm(this.filmId).subscribe(
        (data) => {
          this.filmInventories = data;
        },
        (error) => {
          console.error('Error fetching inventories by film ID:', error);
        }
      );
    }
  }

  // Fetch inventory by Film ID and Store ID
  getFilmInventoryByStore(): void {
    if (this.filmIdForStore && this.storeIdForFilm) {
      this.inventoryService
        .getInventoryByFilmAndStore(this.filmIdForStore, this.storeIdForFilm)
        .subscribe(
          (data) => {
            this.filmStoreInventories = data;
          },
          (error) => {
            console.error(
              'Error fetching inventory by film and store ID:',
              error
            );
          }
        );
    }
  }
}
