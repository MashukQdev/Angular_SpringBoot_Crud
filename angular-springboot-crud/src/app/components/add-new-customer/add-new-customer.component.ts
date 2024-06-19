import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrl: './add-new-customer.component.css'
})
export class AddNewCustomerComponent {

  addCustomerForm! : FormGroup
  showLoader: boolean = false;      // Variable to control the loader visibility
  maxDate: Date = new Date();       // for disabled future dates in date of birth option
  popupMessageText: string = '';

  @ViewChild('popupMessage', { static: false }) popupMessage!: ElementRef;    // reference the popup message

  constructor(private customerService: CustomerService, 
              private fb: FormBuilder, 
              public dialogRef: MatDialogRef<AddNewCustomerComponent>,
              private renderer: Renderer2,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any ) { }

  /**
   * Calls initializeForm method
   */            
  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Initializes the addCustomerForm FormGroup with validation rules for each form control.
   */
  initializeForm() {
    this.addCustomerForm = this.fb.group({
      id:[this.data.customer ? this.data.customer.id : '' ],
      firstName: [this.data.customer ? this.data.customer.firstName: '', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: [this.data.customer ? this.data.customer.lastName: '', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      dateOfBirth: [this.data.customer ? this.data.customer.dateOfBirth: '', [Validators.required]],
      mobileNo: [this.data.customer ? this.data.customer.mobileNo: '', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(17)]],
      addressLineOne: [this.data.customer ? this.data.customer.addressLineOne: '', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      addressLineTwo: [this.data.customer ? this.data.customer.addressLineTwo: '', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      age: [this.data.customer ? this.data.customer.age: '', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(2)]],
      gender: [this.data.customer ? this.data.customer.gender.toString() : '0', []],
      email: [this.data.customer ? this.data.customer.email: '', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.maxLength(30)]]
     });
  }

  /**
   * Checks if a given date is in the future or not.
   * @param date The date to be checked.
   * @returns {boolean} - True if the date is not in the future (or null), otherwise false.
   */
  filterFutureDates = (date: Date | null): boolean => {
    const today = new Date();
    return date ? date <= today : false;
  }

  /**
   * Closes the current dialog and refreshes the background page.
   */
  closeDialog(): void {
    this.dialogRef.close();
    window.location.reload(); // Refresh the background page
  }

  /**
   * Perform form submission for add and update a customer.
   * Checks mobile number and email availability using customerService methods and show error if registered.
   * Shows loader and popup message on successful form submission.
   */
  onSubmit(): void {
    if (this.addCustomerForm.valid) {
      if(this.data.customer) {
        this.customerService.updateCustomerDetails(this.addCustomerForm.value).subscribe(
          response => {
            this.popupMessageText = 'Data updated successfully.';
            this.showRoungLoader();
          },
          error => {
            this.getMobileAndEmailAlreadyExistsError(error);
          }
        );
      } else {
        this.popupMessageText = 'Data added successfully.';
        this.customerService.addCustomerDetails(this.addCustomerForm.value).subscribe(
          response => {
            this.showRoungLoader();
          },
          error => {
            this.getMobileAndEmailAlreadyExistsError(error);
          }
        );
      }
    }
  }

  /**
   * Show popup message for successfull form submission. 
   */
  showPopupMessage(callback: Function): void {
    this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'block');
    setTimeout(() => {
      this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'none');
      callback();
    }, 1000); // Hide popup message after 1 second
  }

  /**
   * Show loader for successfull form submission. 
   */
  showRoungLoader() {
    this.showLoader = true;
    setTimeout(() => {
      this.showPopupMessage(() => {
        setTimeout(() => {
          this.showLoader = false;
          setTimeout(() => {
            this.closeDialog();
          }, 0); // Close main dialog after 1 second
        }, 0); // Simulated delay of 1 second
      });
    }, 1000); // Show popup message after 1 second
  }

  /**
   * Handles errors related to the existence of mobile numbers and email addresses.
   * @param error The error object containing the error message
   */
  getMobileAndEmailAlreadyExistsError(error: any) {
    const errorMessage = error?.error || '';

     // Handle the case where both mobile or email is already registered
     if (errorMessage.includes('Mobile') && errorMessage.includes('Email')) {
      // Show error message for mobile number and email
      this.addCustomerForm.get('mobileNo')!.setErrors({ mobileExists: true });
      this.addCustomerForm.get('email')!.setErrors({ emailExists: true });
    } else if (errorMessage.includes('Mobile')) {
      // Show error message for mobile number
      this.addCustomerForm.get('mobileNo')!.setErrors({ mobileExists: true });
    } else if(errorMessage.includes('Email')) {
      // Show error message for email
      this.addCustomerForm.get('email')!.setErrors({ emailExists: true });
    }
  }

}
