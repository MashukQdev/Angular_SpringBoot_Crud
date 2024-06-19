package com.mvc.service;

import java.util.List;
import org.springframework.http.ResponseEntity;
import com.mvc.dto.CustomerDto;

/**
 * Service interface for managing customer-related operations.
 */
public interface CustomerService {

	/**
	 * Retrieves a list of all customers.
	 * @return List of Customer objects.
	 */
	public List<CustomerDto> getAllCustomerList();
	
	/**
	 * Adds a new customer using the provided dto.
	 * @param customerDto The data transfer object containing customer details
	 * @return a {@link ResponseEntity} containing the result of the add customer operation.
	 */
	public ResponseEntity<?> addCustomer(CustomerDto customerDto);
	
	
	/**
	 * Delete a customer by ID.
	 * @param id The customer ID to be deleted.
	 * @return A string containing a message.
	 */
	public String deleteCustomer(long id);
	
}
