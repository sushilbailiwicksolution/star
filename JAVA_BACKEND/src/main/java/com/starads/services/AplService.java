package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.AplRepository;
import com.starads.repository.entity.Apl;

@Service
public class AplService extends GenericService<Apl> {

	@Autowired
	public AplService(AplRepository repository) {
		super(repository);
	}

}
