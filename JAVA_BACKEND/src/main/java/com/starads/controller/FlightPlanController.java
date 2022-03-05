package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.FlightPlanDto;
import com.starads.generic.GenericController;
import com.starads.orch.FlightPlanOrch;
import com.starads.repository.entity.FlightPlan;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.FLIGHT_PLANS_API)
public class FlightPlanController extends GenericController<FlightPlanDto, FlightPlan> {

	@Autowired
	public FlightPlanController(FlightPlanOrch orch) {
		super(orch);
	}

}
