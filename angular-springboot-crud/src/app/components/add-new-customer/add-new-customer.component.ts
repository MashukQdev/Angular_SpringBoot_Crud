import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ValidationService } from '../../service/validation.service';
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

  @ViewChild('popupMessage', { static: false }) popupMessage!: ElementRef;    // reference the popup message

  constructor(private customerService: CustomerService, 
              private fb: FormBuilder, 
              public dialogRef: MatDialogRef<AddNewCustomerComponent>,
              private validationService: ValidationService, 
              private renderer: Renderer2,
              private dialog: MatDialog,) { }

  /**
   * Initializes the addCustomerForm FormGroup with validation rules for each form control.
   */            
  ngOnInit() {
     this.addCustomerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      dateOfBirth: [null, [Validators.required]],
      mobileNo: [null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(17)]],
      addressLineOne: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      addressLineTwo: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      age: [null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(1), Validators.maxLength(3)]],
      gender: ['0', []],
      email: [null, [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.maxLength(30)]]
     });
  }

  /**
   * Checks if a form control is invalid based on its control name. 
   * @param controlName The name of the form control to check.
   * @returns {boolean} - True if the control is invalid, otherwise false.
   */
  isInvalid(controlName: string): boolean {
    const control = this.addCustomerForm.get(controlName);
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
   * Closes the current dialog and refreshes the background page.
   */
  closeDialog(): void {
    this.dialogRef.close();
    window.location.reload(); // Refresh the background page
  }

  /**
   * Retrieves the error message for the first name form control.
   * @returns {string} - The error message for the first name form control to show.
   */
  getFirstNameErrorMessage(): string {
    return this.validationService.getFirstNameErrorMessage(this.addCustomerForm.get('firstName')!);
  }

  /**
   * Retrieves the error message for the last name form control.
   * @returns {string} - The error message for the last name form control to show.
   */
  getLastNameErrorMessage(): string {
    return this.validationService.getLastNameErrorMessage(this.addCustomerForm.get('lastName')!);
  }

  /**
   * Retrieves the error message for the date of birth form control.
   * @returns {string} - The error message for the date of birth form control to show.
   */
  getDateOfBirthErrorMessage(): string {
    return this.validationService.getDateOfBirthErrorMessage(this.addCustomerForm.get('dateOfBirth')!);
  }

  /**
   * Retrieves the error message for the mobile number form control.
   * @returns {string} - The error message for the mobile number form control to show.
   */
  getMobileNoErrorMessage(): string {
    return this.validationService.getMobileNoErrorMessage(this.addCustomerForm.get('mobileNo')!);
  }

  /**
   * Retrieves the error message for the address line one form control.
   * @returns {string} - The error message for the address line one form control to show.
   */
  getAddressOneErrorMessage(): string {
    return this.validationService.getAddressErrorMessage(this.addCustomerForm.get('addressLineOne')!);
  }

  /**
   * Retrieves the error message for the address line two form control.
   * @returns {string} - The error message for the address line two form control to show.
   */
  getAddressTwoErrorMessage(): string {
    return this.validationService.getAddressErrorMessage(this.addCustomerForm.get('addressLineTwo')!);
  }
  
  /**
   * Retrieves the error message for the age form control.
   * @returns {string} - The error message for the age form control to show.
   */
  getAgeErrorMessage(): string {
    return this.validationService.getAgeErrorMessage(this.addCustomerForm.get('age')!);
  }

  /**
   * Retrieves the error message for the email form control.
   * @returns {string} - The error message for the email form control to show.
   */
  getEmailErrorMessage(): string {
    return this.validationService.getEmailErrorMessage(this.addCustomerForm.get('email')!);
  }

  /**
   * Perform form submission for add a new customer.
   * Checks mobile number and email availability using customerService methods and show error if registered.
   * Shows loader and popup message on successful form submission.
   */
  onSubmit(): void {
    if (this.addCustomerForm.valid) {
      this.customerService.addCustomerDetails(this.addCustomerForm.value).subscribe(
        response => {
          if (response.includes('Data saved')) {     // if mobile number and email does not duplicate then submit
            // Show loader and popup message 
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
              this.addCustomerForm.get('mobileNo')!.setErrors({ mobileExists: true });
              this.addCustomerForm.get('email')!.setErrors({ emailExists: true });

            } else if (response.includes('Mobile number already registered')) {
              // Show error message for mobile number
              this.addCustomerForm.get('mobileNo')!.setErrors({ mobileExists: true });

            } else if(response.includes('Email already registered')) {
              // Show error message for email
              this.addCustomerForm.get('email')!.setErrors({ emailExists: true });
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
   * Adds customer data to the database using customer service 
   */
  showPopupMessage(callback: Function): void {
    this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'block');
    setTimeout(() => {
      this.renderer.setStyle(this.popupMessage.nativeElement, 'display', 'none');
      callback();
    }, 1000); // Hide popup message after 1 second
  }

}
