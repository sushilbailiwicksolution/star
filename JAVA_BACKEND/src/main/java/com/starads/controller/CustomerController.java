package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.CustomerDto;
import com.starads.generic.GenericController;
import com.starads.orch.CustomerOrch;
import com.starads.repository.entity.Customer;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.CUSTOMER_API)
public class CustomerController extends GenericController<CustomerDto, Customer> {

	@Autowired
	public CustomerController(CustomerOrch orch) {
		super(orch);
	}

}
