package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.starads.dto.FlightPlanDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.FlightLocation;
import com.starads.repository.entity.FlightPlan;
import com.starads.services.FlightPlanService;

@Service
public class FlightPlanOrch extends GenericOrch<FlightPlanDto, FlightPlan> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public FlightPlanOrch(FlightPlanService service) {
		super(service);
	}

	@Override
	protected FlightPlan convertToEntity(FlightPlanDto dto) {
		FlightPlan flightPlan = modelMapper.map(dto, FlightPlan.class);
		flightPlan.setStatus(EntityStatus.ACTIVE);
		if (!CollectionUtils.isEmpty(dto.getLocations())) {
			for (FlightLocation location : flightPlan.getLocations()) {
				location.setStatus(EntityStatus.ACTIVE);
				location.setFlightPlan(flightPlan);
			}
		}
		return flightPlan;
	}

	@Override
	protected FlightPlanDto convertToDTO(FlightPlan ent) {
		FlightPlanDto flightPlanDto = modelMapper.map(ent, FlightPlanDto.class);
		return flightPlanDto;
	}

}
