package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.EventDetailsRepository;
import com.starads.repository.entity.EventDetails;

@Service
public class EventDetailsService extends GenericService<EventDetails> {

	@Autowired
	public EventDetailsService(EventDetailsRepository repository) {
		super(repository);
	}
}
