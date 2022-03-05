package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.CustomerRepository;
import com.starads.repository.entity.Customer;

@Service
public class CustomerService extends GenericService<Customer> {

	@Autowired
	public CustomerService(CustomerRepository repository) {
		super(repository);
	}

}
