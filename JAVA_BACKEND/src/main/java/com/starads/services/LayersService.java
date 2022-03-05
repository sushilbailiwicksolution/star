package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.LayersRepository;
import com.starads.repository.entity.Layers;

@Service
public class LayersService extends GenericService<Layers> {

	@Autowired
	public LayersService(LayersRepository repository) {
		super(repository);
	}
}
