import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.css'
})
export class DeleteCustomerComponent {

  @ViewChild('popupMessage') popupMessage!: ElementRef; // reference the popup message
  @ViewChild('alertMessage') alertMessage!: ElementRef; // reference the alert message

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteCustomerComponent>,
              private dialog: MatDialog,
              private customerService: CustomerService,
              private renderer: Renderer2
  ) { }

  /**
   * Close the alert confirmation.
   */
  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload(); 
  }

  /**
   * It delete customer data through customer service by id.
   */
  onYesClick(): void {
    this.customerService.deleteCustomer(this.data.customer.id).subscribe(
      (response) => {
        if(response.includes('Data deleted.')) {
          this.showPopupMessage();
          setTimeout(() => {
            this.dialogRef.close();
            window.location.reload(); 
          }, 1000); // Adjust the time as needed
        }
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }

  /**
   * Show popup message for data deleted.
   */
  private showPopupMessage(): void {
    this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'block');  // Set popup message display
    
    this.renderer.setStyle(this.alertMessage.nativeElement, 'display', 'none');   // make alert display none so that it is not visible in background
    setTimeout(() => {
      this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'none');   // hide popup message
    }, 800); // Hide after 1 second
  }

}
