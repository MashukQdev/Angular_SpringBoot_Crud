import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  /**
   * Generate a error message based on the validation errors present in the control for first name.
   * @param control The AbstractControl instance representing the first name input field.
   * @returns A string containing the error message.
   */
  getFirstNameErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'First Name cannot be empty.';
    } else if(control.hasError('pattern')) {
      return 'First name contain only alphabets.';
    } else if(control.hasError('minlength')) {
      return 'First name must be at least 2 characters long.';
    } else if(control.hasError('maxlength')) {
      return 'First name must not be longer than 30 characters.';
    } else {
      return '';
    }
  }

  /**
   * Generate a error message based on the validation errors present in the control for last name.
   * @param control The AbstractControl instance representing the last name input field.
   * @returns A string containing the error message.
   */
  getLastNameErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Last Name cannot be empty.';
    } else if(control.hasError('pattern')) {
      return 'Last name contain only alphabets.';
    } else if(control.hasError('minlength')) {
      return 'Last name must be at least 2 characters long.';
    } else if(control.hasError('maxlength')) {
      return 'Last name must not be longer than 30 characters.';
    } else {
      return '';
    }
  }

  /**
   * Generate a error message based on the validation errors present in the control for date of birth.
   * @param control The AbstractControl instance representing the date of birth input field.
   * @returns A string containing the error message.
   */
  getDateOfBirthErrorMessage(control: AbstractControl): string {
    if(control.hasError('required')) {
      return 'Date of Birth cannot be empty.';
    } else {
      return '';
    }
  }

  /**
   * Generate a error message based on the validation errors present in the control for mobile number.
   * @param control The AbstractControl instance representing the mobile number input field.
   * @returns A string containing the error message.
   */
  getMobileNoErrorMessage(control: AbstractControl): string {
    if(control.hasError('required')) {
      return 'Mobile number cannot be empty.';
    } else if(control.hasError('pattern')) {
      return 'Mobile number must contain only digits.';
    } else if(control.hasError('minlength')) {
      return 'Mobile number must be at least 10 characters long.';
    } else if(control.hasError('maxlength')) {
      return 'Mobile number cannot be loner than 17 characters.';
    } else {
      return '';
    }
  }

  /**
   * Generate a error message based on the validation errors present in the control for address line one and two.
   * @param control The AbstractControl instance representing the address line one and two input field.
   * @returns A string containing the error message.
   */
  getAddressErrorMessage(control: AbstractControl): string {
    if(control.hasError('required')) {
      return 'Address cannot be empty.';
    } else if(control.hasError('minlength')) {
      return 'Address must be at least 4 characters long.';
    } else if(control.hasError('maxlength')) {
      return 'Address cannot be longer than 70 characters.';
    } else {
      return '';
    }
  }

  /**
   * Generate a error message based on the validation errors present in the control for age.
   * @param control The AbstractControl instance representing the age input field.
   * @returns A string containing the error message.
   */
  getAgeErrorMessage(control: AbstractControl): string {
    if(control.hasError('required')) {
      return 'Age cannot be empty.';
    } else if(control.hasError('pattern')) {
      return 'Age must contain only digits.';
    } else if(control.hasError('minlength')) {
      return 'Age must be at least 1 character long.';
    } else if(control.hasError('maxlength')) {
      return 'Age cannot be longer than 3 characters.';
    } else {
      return '';
    }
  }

  /**
   * Generate a error message based on the validation errors present in the control for email.
   * @param control The AbstractControl instance representing the email input field.
   * @returns A string containing the error message.
   */
  getEmailErrorMessage(control: AbstractControl): string {
    if(control.hasError('required')) {
      return 'Email cannot be empty.';
    } else if(control.hasError('minlength')) {
      return 'Email must be at least 4 characters long.';
    } else if(control.hasError('pattern')) {
      return 'Inavlid email.';
    } else if(control.hasError('maxlength')) {
      return 'Email cannot be longer than 30 characters.';
    } else {
      return '';
    }
  }

}
