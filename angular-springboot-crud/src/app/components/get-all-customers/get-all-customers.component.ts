import { Component, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewCustomerComponent } from '../add-new-customer/add-new-customer.component';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';

@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.css']
})
export class GetAllCustomersComponent {

  customers: any[] = [];      // store all customers data
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dateOfBirth', 'mobileNo', 'address', 'age', 'gender', 'email', 'actions'];  

  constructor(private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCustomers();
  }

  /**
   * Retrieves all customers from the customer service.
   * Subscribes to the getAllCustomers observable and assigns the response to the customers array.
   */
  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((res)=>{
      console.log(res);
      this.customers = res;
    });
  }

  /**
   * Opens a popup dialog to add a new customer.
   * Uses MatDialog to open the AddNewCustomerComponent within the dialog.
   */
  addCustomerPopup(): void {
    const dialogRef = this.dialog.open(AddNewCustomerComponent, {
      width: '1000px', // Set the width of the dialog
      height: '700px',
      maxWidth: 'none',
      disableClose: true,
      data: {} 
    });
  }

  /**
   * Opens a popup dialog to update a customer details.
   * @param customer The customer object to be updated.
   */
  updateCustomerPopup(customer: any): void {
    const dialogRef = this.dialog.open(AddNewCustomerComponent, {
      width: '1000px', // Set the width of the dialog
      height: '700px',
      maxWidth: 'none',
      disableClose: true,
      data: {customer: customer} // passing the data to the dialog
    });
  }

  /**
   * Opens a alert dialog to delete a customer data. 
   * @param customer The customer object to be updated.
   */
  deleteAlert(customer: any) {
    const dialogRef = this.dialog.open(DeleteCustomerComponent, {
      width: '550px',
      position: {'top': '0'},
      disableClose: true,
      data: {message: 'Are you sure you want to delete this customer [' + customer.firstName + ' ' + customer.lastName + '] ?', customer: customer}
    });
  }

}
