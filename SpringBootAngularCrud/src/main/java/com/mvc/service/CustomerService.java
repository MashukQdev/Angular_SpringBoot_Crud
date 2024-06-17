package com.mvc.service;

import java.util.List;

import com.mvc.dto.CustomerDto;
import com.mvc.entity.Customer;

/**
 * Service interface for managing customer-related operations.
 */
public interface CustomerService {

	/**
	 * Retrieves a list of all customers.
	 * @return List of Customer objects.
	 */
	public List<Customer> getAllCustomerList();
	
	/**
	 * Add new customer
	 * @param customerDto The customer data to be added.
	 * @return A string containing a message.
	 */
	public String addCustomer(CustomerDto customerDto);
	
	/**
	 * Updates details of a customer by ID.
	 * @param id The customer ID.
	 * @param customer The updated customer details.
	 * @return A string containing a message.
	 */
	public String updateCustomerDetails(long id, CustomerDto updatedCutomerDto);
	
	/**
	 * Delete a customer by ID.
	 * @param id The customer ID to be deleted.
	 * @return A string containing a message.
	 */
	public String deleteCustomer(long id);
	
}
