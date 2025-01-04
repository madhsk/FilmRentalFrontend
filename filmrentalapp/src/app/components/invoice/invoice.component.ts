import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  customer: any = {};
  film: any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.customer = navigation.extras.state['customer'];
      this.film = navigation.extras.state['film'];
      console.log('Received Customer:', this.customer);
      console.log('Received Film:', this.film);
  
      // If customer or film is still null, you can log this as well
      if (!this.customer || !this.film) {
        console.error('Customer or Film data is missing in InvoiceComponent');
      }
    } else {
      console.error('No state data found in the navigation');
    }
  }
  

  downloadInvoice() {
    console.log('Downloading invoice...');
    alert('Invoice downloaded successfully!');
  }
}
