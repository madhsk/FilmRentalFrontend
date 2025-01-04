import { Routes } from '@angular/router';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { StaffComponent } from './components/admin/staff/staff.component';
import { FilmComponent } from './components/admin/film/film.component';
import { ActorComponent } from './components/admin/actor/actor.component';
import { StoreComponent } from './components/admin/store/store.component';
import { RentalComponent } from './components/rental/rental.component';
import { IndexComponent } from './components/index/index.component';
import { PaymentComponent } from './components/payment/payment.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent1 } from './components/login/login.component';
import { RegisterComponent1 } from './components/register/register.component';
import { FilmComponent1 } from './components/film/film.component';
import { CustomerComponent } from './components/customer/customer.component';
export const routes: Routes = [
    {path:'admin-register',component: RegisterComponent}, 
    {path:'admin-login',component:LoginComponent},
    {path:'admin-dashboard',component:AdminDashboardComponent},
    {path:'admin-staff',component:StaffComponent},
    {path:'admin-film',component:FilmComponent},
    {path:'admin-actor',component:ActorComponent},
    {path:'admin-store',component:StoreComponent},
    {path:'rental',component:RentalComponent},
    {path :'',component:IndexComponent},
    {path:'staff-film', component:FilmComponent1},
    {path: 'app-login', component: LoginComponent1},
    {path: 'app-register', component: RegisterComponent1},
    {path:'payment/:filmId',component:PaymentComponent},
    {path:'invoice', component:InvoiceComponent},
    {path:'customer-details',component:CustomerComponent}
];
 
