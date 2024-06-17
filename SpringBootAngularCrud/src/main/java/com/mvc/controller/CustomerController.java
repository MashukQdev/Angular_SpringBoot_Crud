package com.mvc.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.mvc.dto.CustomerDto;
import com.mvc.entity.Customer;
import com.mvc.service.CustomerService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")   // Allows cross-origin requests from any domain (for development purposes)
public class CustomerController {

	@Autowired
	private CustomerService service;
	
	/**
	 * Retrieves a list of all customers.
	 * @return List of Customer objects.
	 */
	@GetMapping("/customers")
	public List<Customer> getAllCustomerList() {
		return service.getAllCustomerList();
	}
	
	/**
	 * Add new customer
	 * @param customerDto The customer data to be added.
	 * @return A ResponseEntity string containing a message.
	 */
	@PostMapping("/customer/add")
	public ResponseEntity<String> addCusomer(@Valid @RequestBody CustomerDto customerDto) {
		String message = service.addCustomer(customerDto);
		return ResponseEntity.ok(message);
	}
	
	/**
	 * Updates details of a customer by ID.
	 * @param id The customer ID.
	 * @param customer The updated customer details.
	 * @return A ResponseEntity string containing a message.
	 */
	@PutMapping("/customer/update/{id}")
	public ResponseEntity<String> updateCustomer(@PathVariable long id, @Valid @RequestBody CustomerDto customer) {
		String message = service.updateCustomerDetails(id, customer);
		return ResponseEntity.ok(message);
	}
	
	/**
	 * Delete a customer by ID.
	 * @param id The customer ID to be deleted.
	 * @return A ResponseEntity string containing a message.
	 */
	@DeleteMapping("/customer/delete/{id}")
	public ResponseEntity<String> deleteCustomer(@PathVariable long id) {
		String message = service.deleteCustomer(id);
		return ResponseEntity.ok(message);
	}
	
}
