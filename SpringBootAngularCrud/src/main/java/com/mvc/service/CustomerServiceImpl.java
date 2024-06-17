package com.mvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mvc.dto.CustomerDto;
import com.mvc.entity.Customer;
import com.mvc.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository repository;

	@Override
	public List<Customer> getAllCustomerList() {
		return repository.findAll();
	}

	@Override
	public String addCustomer(CustomerDto customerDto) {
		boolean isMobileExists = repository.existsByMobileNo(customerDto.getMobileNo());
		boolean isEmailExists = repository.existsByEmail(customerDto.getEmail());
		
		// check if email and mobile number already register
		if(isMobileExists && isEmailExists) {
			return "Mobile number and email already registered";
			
		} else if(isMobileExists) {   
			return "Mobile number already registered";
			
		} else if(isEmailExists) {
			return "Email already registered";
			
		} else {        // if none of mobile or email register then save the data
			Customer customer = new Customer();
			
			customer.setFirstName(customerDto.getFirstName());
			customer.setLastName(customerDto.getLastName());
			customer.setDateOfBirth(customerDto.getDateOfBirth());
			customer.setMobileNo(customerDto.getMobileNo());
			customer.setAddressLineOne(customerDto.getAddressLineOne());
			customer.setAddressLineTwo(customerDto.getAddressLineTwo());
			customer.setAge(customerDto.getAge());
			customer.setGender(customerDto.getGender());
			customer.setEmail(customerDto.getEmail());
			
			repository.save(customer);
			return "Data saved";
		}
	}

	@Override
	public String updateCustomerDetails(long id, CustomerDto updatedCutomerDto) {
		
		Customer existingCustomer = repository.findById(id).orElse(null);
		
		// check if previous and enter mobile number or email are same then no need to check for duplicate as it updating the data
		boolean isMobileSame = existingCustomer.getMobileNo().equals(updatedCutomerDto.getMobileNo());
		boolean isEmailSame = existingCustomer.getEmail().equals(updatedCutomerDto.getEmail());
		
		//check in database for duplicate entry of mobile number or email
		boolean isMobileExists = repository.existsByMobileNo(updatedCutomerDto.getMobileNo());
		boolean isEmailExists = repository.existsByEmail(updatedCutomerDto.getEmail());
		
		// check for duplicate email and mobile number
		if((!isMobileSame && isMobileExists) && (!isEmailSame && isEmailExists)) {
			return "Mobile number and email already registered";
			
		} else if(!isMobileSame && isMobileExists) {
			return "Mobile number already registered";
			
		} else if(!isEmailSame && isEmailExists) {
			return "Email already registered";
			
		} else {
			existingCustomer.setFirstName(updatedCutomerDto.getFirstName());
			existingCustomer.setLastName(updatedCutomerDto.getLastName());
			existingCustomer.setDateOfBirth(updatedCutomerDto.getDateOfBirth());
			existingCustomer.setMobileNo(updatedCutomerDto.getMobileNo());
			existingCustomer.setAddressLineOne(updatedCutomerDto.getAddressLineOne());
			existingCustomer.setAddressLineTwo(updatedCutomerDto.getAddressLineTwo());
			existingCustomer.setAge(updatedCutomerDto.getAge());
			existingCustomer.setGender(updatedCutomerDto.getGender());
			existingCustomer.setEmail(updatedCutomerDto.getEmail());
			
			repository.save(existingCustomer);
			return "Data saved";
		}
	}

	@Override
	public String deleteCustomer(long id) {
		if(repository.existsById(id)) {
			// if id exists then delete that customer data
			repository.deleteById(id);
			return "Data deleted.";
		} else {
			// if id not exists then return error message
			return "Customer data not found.";
		}	
	}

}
