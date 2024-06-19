package com.mvc.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mvc.dto.CustomerDto;
import com.mvc.service.CustomerService;
import jakarta.validation.Valid;

@RestController()
@CrossOrigin("*")   // Allows cross-origin requests from any domain (for development purposes)
@RequestMapping("customer")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	/**
	 * Retrieves a list of all customers.
	 * @return List of Customer objects.
	 */
	@GetMapping("/getall")
	public List<CustomerDto> getAllCustomerList() {
		return customerService.getAllCustomerList();
	}
	
	/**
	 * Add new customer
	 * @param customerDto The customer data to be added.
	 * @return A ResponseEntity string containing a message.
	 */
	@PostMapping("/add")
	public ResponseEntity<?> addCusomer(@Valid @RequestBody CustomerDto customerDto) {
		ResponseEntity<?> response = customerService.addCustomer(customerDto);
		if(response.getStatusCode() == HttpStatus.BAD_REQUEST) {
			return response;
		} else if(response.getStatusCode() == HttpStatus.OK) {
			return response;
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	/**
	 * Updates details of a customer by ID.
	 * @param id The customer ID.
	 * @param customer The updated customer details.
	 * @return A ResponseEntity string containing a message.
	 */
	@PutMapping("/update")
	public ResponseEntity<?> updateCustomer(@Valid @RequestBody CustomerDto customerDto) {
		ResponseEntity<?> response = customerService.addCustomer(customerDto);
		if(response.getStatusCode() == HttpStatus.BAD_REQUEST) {
			return response;
		} else if(response.getStatusCode() == HttpStatus.OK) {
			return response;
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	/**
	 * Delete a customer by ID.
	 * @param id The customer ID to be deleted.
	 * @return A ResponseEntity string containing a message.
	 */
	@DeleteMapping("/customer/delete/{id}")
	public ResponseEntity<String> deleteCustomer(@PathVariable long id) {
		String message = customerService.deleteCustomer(id);
		return ResponseEntity.ok(message);
	}
	
}
