package com.starads.repository;

import org.springframework.stereotype.Repository;

import com.starads.repository.entity.Customer;

@Repository
public interface CustomerRepository extends GenericRepository<Customer> {

}
