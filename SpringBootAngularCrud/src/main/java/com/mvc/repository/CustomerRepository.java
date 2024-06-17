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
	
}
