import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllCustomersComponent } from './components/get-all-customers/get-all-customers.component';
import { AddNewCustomerComponent } from './components/add-new-customer/add-new-customer.component';
const routes: Routes = [
  {path:'customers', component:GetAllCustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
