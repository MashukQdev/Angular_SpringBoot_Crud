package com.mvc.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import com.mvc.dto.CustomerDto;
import com.mvc.entity.Customer;
import com.mvc.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<CustomerDto> getAllCustomerList() {
		List<Customer> customers = customerRepository.findAll();
        return modelMapper.map(customers, new org.modelmapper.TypeToken<List<CustomerDto>>() {}.getType());
	}

	@Override
	public ResponseEntity<?> addCustomer(CustomerDto customerDto) {
		ResponseEntity<?> response = null;
		
		boolean isMobileExists = checkMobile(customerDto.getMobileNo(), customerDto.getId());
		boolean isEmailExists = checkEmail(customerDto.getEmail(), customerDto.getId());
		
		// check if email and mobile number already register
		if(isMobileExists && isEmailExists) {
			response = ResponseEntity.badRequest().body("Mobile and Email already exists.");	
		} else if(isMobileExists) {   
			response = ResponseEntity.badRequest().body("Mobile already exists.");
		} else if(isEmailExists) {
			response = ResponseEntity.badRequest().body("Email already exists.");
		} else {        // if none of mobile or email register then save the data
			Customer customer = modelMapper.map(customerDto, Customer.class);
			customerRepository.save(customer);
			response = ResponseEntity.ok(customer);
		}
		return response;
	}

	@Override
	public String deleteCustomer(long id) {
		if(customerRepository.existsById(id)) {
			// if id exists then delete that customer data
			customerRepository.deleteById(id);
			return "Data deleted.";
		} else {
			// if id not exists then return error message
			return "Customer data not found.";
		}	
	}
	
	/**
	 * Checks if a mobile number already exists in the repository, excluding a specific customer ID if provided.
	 * @param mobileNo The mobile number to check for existence.
	 * @param id The ID of the customer to exclude from the check 
	 *	 		(use 0 or a negative value if no exclusion is needed)
	 * @return true if the mobile number exists and is associated with a different customer ID, false otherwise
	 */
	public boolean checkMobile(String mobileNo, long id) {
		if(id > 0) {
			return customerRepository.existsByMobileNoAndIdNot(mobileNo, id);
		} else {
			return customerRepository.existsByMobileNo(mobileNo);
		}
	}
	
	/**
	 * Checks if a email already exists in the repository, excluding a specific customer ID if provided.
	 * @param email The email to check for existence.
	 * @param id The ID of the customer to exclude from the check 
	 *	 		(use 0 or a negative value if no exclusion is needed)
	 * @return true if the email exists and is associated with a different customer ID, false otherwise
	 */
	public boolean checkEmail(String email, long id) {
		if(id > 0) {
			return customerRepository.existsByEmailAndIdNot(email, id);
		} else {
			return customerRepository.existsByEmail(email);
		}
	}

}
