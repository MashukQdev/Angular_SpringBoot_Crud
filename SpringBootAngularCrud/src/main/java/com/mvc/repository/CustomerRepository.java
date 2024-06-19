package com.mvc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mvc.entity.Customer;

/**
 * Repository interface for managing Customer entities.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

	/**
	 * Checks if a customer with the given mobile number exists.
	 * @param mobileNo The mobile number to check.
	 * @return True if a customer with the mobile number exists, false otherwise.
	 */
	public boolean existsByMobileNo(String mobileNo);    // JPQL Query
	
	/**
	 * Checks if a customer with the given email exists.
	 * @param email The email to check.
	 * @return True if a customer with the email exists, false otherwise.
	 */
	public boolean existsByEmail(String email);          // JPQL Query
	
	/**
	 * Checks if an email exists for a customer, excluding a specific customer ID.
	 * @param email The email to check.
	 * @param id The ID of the customer to exclude from the check
	 * @return True, if the email exists for a customer other than the specified ID, false otherwise.
	 */
	public boolean existsByEmailAndIdNot(String email, long id);
	
	/**
	 * Checks if a mobile number exists for a customer, excluding a specific customer ID.
	 * @param mobileNo The mobile number to check.
	 * @param id The ID of the customer to exclude from the check
	 * @return True, if the mobile number exists for a customer other than the specified ID, false otherwise.
	 */
	public boolean existsByMobileNoAndIdNot(String mobileNo, long id);
	
}
