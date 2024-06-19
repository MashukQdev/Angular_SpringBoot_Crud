package com.mvc.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "customer")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "first_name", nullable = false, length = 30)
	private String firstName;
	
	@Column(name = "last_name", nullable = false, length = 30)
	private String lastName;
	
	@Column(name = "date_of_birth", nullable = false)
	private Date dateOfBirth;
	
	@Column(name = "mobile_no", nullable = false, length = 17)
	private String mobileNo;
	
	@Column(name = "address_line_one", nullable = false, length = 70)
	private String addressLineOne;
	
	@Column(name = "address_line_two", nullable = false, length = 70)
	private String addressLineTwo;
	
	@Column(name = "age", nullable = false, length = 3)
	private int age;
	
	@Column(name = "gender", nullable = false, length = 1)
	private int gender;
	
	@Column(name = "email", nullable = false, length = 50)
	private String email;
	
}
