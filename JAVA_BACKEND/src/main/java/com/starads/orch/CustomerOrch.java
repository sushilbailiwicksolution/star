package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.dto.CustomerDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.Customer;
import com.starads.services.CustomerService;

@Service
public class CustomerOrch extends GenericOrch<CustomerDto, Customer> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public CustomerOrch(CustomerService service) {
		super(service);
	}

	@Override
	protected Customer convertToEntity(CustomerDto dto) {
		Customer ent = modelMapper.map(dto, Customer.class);
		ent.setStatus(EntityStatus.ACTIVE);
		return ent;
	}

	@Override
	protected CustomerDto convertToDTO(Customer ent) {
		CustomerDto dto = modelMapper.map(ent, CustomerDto.class);
		return dto;
	}

}
