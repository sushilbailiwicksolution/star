package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.EventDetailsDto;
import com.starads.generic.GenericController;
import com.starads.orch.EventDetailsOrch;
import com.starads.repository.entity.EventDetails;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.EVENT_DETAILS_API)
public class EventDetailsController extends GenericController<EventDetailsDto, EventDetails> {

	@Autowired
	public EventDetailsController(EventDetailsOrch orch) {
		super(orch);
	}

}
