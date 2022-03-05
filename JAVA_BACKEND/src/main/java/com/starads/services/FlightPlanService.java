package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.FlightPlanRepository;
import com.starads.repository.entity.FlightPlan;

@Service
public class FlightPlanService extends GenericService<FlightPlan> {

	@Autowired
	public FlightPlanService(FlightPlanRepository repository) {
		super(repository);
	}
}
