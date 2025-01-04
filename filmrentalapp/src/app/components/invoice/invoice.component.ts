import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent1 } from "../navbar/navbar.component"; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  imports: [CommonModule, NavbarComponent1], 
  standalone: true, 
})
export class InvoiceComponent implements OnInit {
  customer: any = null;
  film: any = null;
  payment: any = null;
 
  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.customer = state['customer'];
      this.film = state['film'];
      this.payment = state['payment'];
    }
  }
 
  ngOnInit(): void {
    if (!this.customer || !this.film || !this.payment) {
      console.error('Invoice data is incomplete.');
    }
  }
  printInvoice() {
    console.log('Printing invoice...');
    alert('Invoice Printed successfully!');
    this.router.navigate(["/staff-film"]);
  }
}
 
 