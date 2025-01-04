import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../service/payment.service';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/Customer';
import { FilmService } from '../../service/film.service';
import { Film } from '../../model/film';
import { CommonModule } from '@angular/common';
import { NavbarComponent1 } from "../navbar/navbar.component";
 
@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent1
],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  form: FormGroup;
  paymentStatus: { success: boolean; message: string } | null = null;
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  selectedFilm: Film | null = null;
 
  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private customerService: CustomerService,
    private filmService: FilmService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      filmId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }
 
  ngOnInit(): void {
    // Fetch active customers
    this.customerService.getActiveCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        console.log('Active customers:', data);
      },
      error: (err) => console.error('Error fetching customers:', err),
    });
 
    // Get selected customer from the route params
    const customerName = this.activatedRoute.snapshot.params['customerId'];
    if (customerName) {
      this.customerService.getActiveCustomers().subscribe({
        next: (data) => {
          this.selectedCustomer = data.find(
            (customer) =>
              (customer.firstName + ' ' + customer.lastName).toLowerCase() ===
              customerName.toLowerCase()
          ) || null;
 
          if (this.selectedCustomer) {
            console.log('Selected Customer:', this.selectedCustomer);
            this.form.patchValue({
              customerId: this.selectedCustomer.customerId,
              amount: 100,
            });
            this.form.get('customerId')?.disable();
          } else {
            console.error('Customer not found.');
          }
        },
        error: (err) => console.error('Error fetching customers:', err),
      });
    }
 
    // Get selected film from the route params
    const filmId = +this.activatedRoute.snapshot.params['filmId'];
    if (filmId) {
      this.filmService.findFilmById(filmId).subscribe({
        next: (data) => {
          this.selectedFilm = data;
          console.log('Selected Film:', this.selectedFilm);
          this.form.patchValue({ filmId });
        },
        error: (err) => console.error('Error fetching film:', err),
      });
    }
  }
 
  // Handle customer selection and disable dropdown
  onCustomerSelect(event: Event): void {
    const selectedCustomerId = (event.target as HTMLSelectElement).value;
    this.selectedCustomer = this.customers.find(
      (customer) => customer.customerId === +selectedCustomerId
    ) || null;
 
    if (this.selectedCustomer) {
      this.form.get('customerId')?.disable();
    }
  }
 
  // Handle amount changes
  onAmountChange(event: Event): void {
    const amount = (event.target as HTMLInputElement).value;
    this.form.patchValue({ amount });
  }
 
  // Handle form submission
  onSubmit(): void {
    if (!this.form.valid) {
      alert('Please fill in all required fields and enter a valid amount.');
      return;
    }
 
    const { amount } = this.form.value;
    const name = `${this.selectedCustomer?.firstName} ${this.selectedCustomer?.lastName}`;
    const email = this.selectedCustomer?.email;
 
    this.paymentService.createOrder(amount).subscribe({
      next: (orderDetails) => {
        console.log('Order Details:', orderDetails);
        const options = {
          key: 'rzp_test_aTRUy7xbsDlZn3', // Replace with a secure key
          amount: orderDetails.amount,
          currency: orderDetails.currency,
          name: 'Movie Nest',
          description: 'Transaction',
          order_id: orderDetails.id,
          handler: (response: any) => {
            this.handlePaymentSuccess(response);
          },
          prefill: {
            name,
            email,
          },
          theme: {
            color: '#cc081d',
          },
        };
 
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      },
      error: (error) => {
        alert('Error creating order: ' + error.message);
      },
    });
  }
 
  private handlePaymentSuccess(response: any): void {
    const paymentDetails = {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    };
 
    this.paymentService.verifyPayment(paymentDetails).subscribe({
      next: (result) => {
        this.paymentStatus = { success: true, message: result.message };
        alert('Payment Successful!');
        this.navigateToInvoice();
      },
      error: (error) => {
        this.paymentStatus = {
          success: false,
          message: error.error?.message || 'Payment verification failed.',
        };
        alert('Payment verification failed.');
      },
    });
  }
 
  // Navigate to the invoice page
  navigateToInvoice(): void {
    if (this.selectedCustomer && this.selectedFilm) {
      console.log('Passing Customer:', this.selectedCustomer);
      console.log('Passing Film:', this.selectedFilm);
      console.log('Passing Payment Amount:', this.form.value.amount);
      this.router.navigate(['/invoice'], {
        state: {
          customer: this.selectedCustomer,
          film: this.selectedFilm,
          payment: {
            amount: this.form.value.amount,
            status: this.paymentStatus?.success ? 'Successful' : 'Failed',
          },
        },
      });
    } else {
      console.error('Customer, Film, Payment data is missing');
    }
  }
 
}
 
 