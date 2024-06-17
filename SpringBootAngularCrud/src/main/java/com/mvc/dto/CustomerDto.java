package com.mvc.dto;

import java.sql.Date;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CustomerDto {

	@NotEmpty(message = "First name cannot be empty.")
	@Pattern(regexp = "^[a-zA-Z]+$", message = "First name conatin only alphabets.")
	@Size(min = 2, message = "First name must be at least 2 characters long.")
	@Size(max = 30, message = "First name cannot be longer than 30 characters.")
	private String firstName;
	
	@NotEmpty(message = "Last name cannot be empty.")
	@Pattern(regexp = "^[a-zA-Z]+$", message = "Last name conatin only alphabets.")
	@Size(min = 2, message = "Last name must be at least 2 characters long.")
	@Size(max = 30, message = "Last name cannot be longer than 30 characters.")
	private String lastName;
	
	@NotNull(message = "Date of birth cannot be empty.")
	private Date dateOfBirth;
	
	@NotEmpty(message = "Mobile number cannot be empty.")
	@Pattern(regexp = "^[0-9]+$", message = "Mobile number contain only digits.")
	@Size(min = 10, message = "Mobile number must be at least 10 characters long.")
	@Size(max = 17, message = "Mobile number cannot be longer than 17 characters.")
	private String mobileNo;
	
	@NotEmpty(message = "Address line one cannot be empty.")
	@Size(min = 4, message = "Address must be at least 4 characters long.")
	@Size(max = 50, message = "Address cannot be longer than 50 characters.")
	private String addressLineOne;
	
	@NotEmpty(message = "Address line two cannot be empty.")
	@Size(min = 4, message = "Address must be at least 4 characters long.")
	@Size(max = 50, message = "Address cannot be longer than 50 characters.")
	private String addressLineTwo;
	
	@NotNull(message = "Age cannot be empty.")
	@Min(value = 1, message = "Age must be at least 1 year.")
	@Max(value = 150, message = "Age cannot be greater than 150 years.")
	private int age;
	
	@NotNull(message = "Gender cannot be empty.")
	@Min(value = 0, message = "Gender must be 0 for male.")
    	@Max(value = 1, message = "Gender must be 1 for female.")
	private int gender;
	
	@NotEmpty(message = "Email cannot be empty.")
	@Size(min = 4, message = "Email must be at least 4 characters long.")
	@Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}+$", message = "Invalid email.")
	@Size(max = 30, message = "Email cannot be longer than 30 characters.")
	private String email;
	
}
