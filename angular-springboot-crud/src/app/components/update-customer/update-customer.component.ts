import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ValidationService } from '../../service/validation.service';
import { CustomerService } from '../../service/customer.service';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent {

  updateCustomerForm!: FormGroup
  maxDate: Date = new Date();
  showLoader: boolean = false; // Variable to control the loader visibility

  @ViewChild('popupMessage', { static: false }) popupMessage!: ElementRef;    // reference the popup message div from html

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCustomerComponent>,
    private validationService: ValidationService,
    private customerService: CustomerService,
    private renderer: Renderer2,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to receive data from parent component
  ) { }

  /**
   * Initialize the form with data received from the parent component
   * Adding validation to the form fields
   */
  ngOnInit() {
    this.updateCustomerForm = this.fb.group({
      firstName: [this.data.customer.firstName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: [this.data.customer.lastName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      dateOfBirth: [this.data.customer.dateOfBirth || null, [Validators.required]],
      mobileNo: [this.data.customer.mobileNo || '', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(17)]],
      addressLineOne: [this.data.customer.addressLineOne || '', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      addressLineTwo: [this.data.customer.addressLineTwo || '', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      age: [this.data.customer.age || null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(1), Validators.maxLength(3)]],
      gender: [(this.data.customer && this.data.customer.gender !== undefined) ? this.data.customer.gender.toString() : '', Validators.required],
      email: [this.data.customer.email || '', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.maxLength(30)]]
    });
  }

  /**
   * Closes the current dialog and refreshes the background page.
   */
  closeDialog(): void {
    this.dialogRef.close();
    window.location.reload(); // Refresh the background page
  }

  /**
   * Checks if a form control is invalid based on its control name. 
   * @param controlName The name of the form control to check.
   * @returns {boolean} - True if the control is invalid, otherwise false.
   */
  isInvalid(controlName: string): boolean {
    const control = this.updateCustomerForm.get(controlName);
    return !!control?.invalid && (control.dirty || control.touched);
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
   * Retrieves the error message for the first name form control.
   * @returns {string} - The error message for the first name form control to show.
   */
  getFirstNameErrorMessage(): string {
    return this.validationService.getFirstNameErrorMessage(this.updateCustomerForm.get('firstName')!);
  }

  /**
   * Retrieves the error message for the last name form control.
   * @returns {string} - The error message for the last name form control to show.
   */
  getLastNameErrorMessage(): string {
    return this.validationService.getLastNameErrorMessage(this.updateCustomerForm.get('lastName')!);
  }

   /**
   * Retrieves the error message for the date of birth form control.
   * @returns {string} - The error message for the date of birth form control to show.
   */
  getDateOfBirthErrorMessage(): string {
    return this.validationService.getDateOfBirthErrorMessage(this.updateCustomerForm.get('dateOfBirth')!);
  }

  /**
   * Retrieves the error message for the mobile number form control.
   * @returns {string} - The error message for the mobile number form control to show.
   */
  getMobileNoErrorMessage(): string {
    return this.validationService.getMobileNoErrorMessage(this.updateCustomerForm.get('mobileNo')!);
  }

   /**
   * Retrieves the error message for the address line one form control.
   * @returns {string} - The error message for the address line one form control to show.
   */
  getAddressOneErrorMessage(): string {
    return this.validationService.getAddressErrorMessage(this.updateCustomerForm.get('addressLineOne')!);
  }

  /**
   * Retrieves the error message for the address line two form control.
   * @returns {string} - The error message for the address line two form control to show.
   */
  getAddressTwoErrorMessage(): string {
    return this.validationService.getAddressErrorMessage(this.updateCustomerForm.get('addressLineTwo')!);
  }

  /**
   * Retrieves the error message for the age form control.
   * @returns {string} - The error message for the age form control to show.
   */
  getAgeErrorMessage(): string {
    return this.validationService.getAgeErrorMessage(this.updateCustomerForm.get('age')!);
  }

   /**
   * Retrieves the error message for the email form control.
   * @returns {string} - The error message for the email form control to show.
   */
  getEmailErrorMessage(): string {
    return this.validationService.getEmailErrorMessage(this.updateCustomerForm.get('email')!);
  }

   /**
   * Perform form submission for add a new customer.
   * Checks mobile number and email availability using customerService methods and show error if registered.
   * Shows loader and popup message on successful form submission.
   */
  onSubmit(): void {
    if (this.updateCustomerForm.valid) {
      this.customerService.updateCustomerDetails(this.data.customer.id, this.updateCustomerForm.value)
      .subscribe(
        response => {
          if (response.includes('Data saved')) {     // on successful data save process
            // Show loader and popup message simultaneously
            this.showLoader = true;
            setTimeout(() => {
              this.showPopupMessage(() => {
                // Simulate form submission delay
                setTimeout(() => {
                  // Hide loader after form submission
                  this.showLoader = false;

                  // Close the main dialog after 1 second
                  setTimeout(() => {
                    this.closeDialog();
                  }, 0); // Close main dialog after 1 second
                }, 0); // Simulated delay of 1 second
              });
            }, 1000); // Show popup message after 1 second
          } else {
            // Handle the case where either mobile or email is already registered
            if (response.includes('Mobile number and email already registered')) {
              // Show error message for mobile number and email
              this.updateCustomerForm.get('mobileNo')!.setErrors({ mobileExists: true });
              this.updateCustomerForm.get('email')!.setErrors({ emailExists: true });

            } else if (response.includes('Mobile number already registered')) {
              // Show error message for mobile 
              this.updateCustomerForm.get('mobileNo')!.setErrors({ mobileExists: true });

            } else if(response.includes('Email already registered')) {
               // Show error message for email
              this.updateCustomerForm.get('email')!.setErrors({ emailExists: true });
            }
          }
        },
        error => {
          // Handle error from the service
          console.error('Error checking mobile number or email', error);
        }
      );
    }
  }

  /**
   * Show popup message for successfull form submission.
   * Update customer data to the database using customer service 
   */
  showPopupMessage(callback: Function): void {
    this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'block');
    
    setTimeout(() => {
      this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'none');
      callback();
    }, 1000); // Hide popup message after 1 second
  }

}
