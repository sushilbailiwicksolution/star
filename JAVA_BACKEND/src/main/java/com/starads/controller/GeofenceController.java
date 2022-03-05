package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.GeofenceDto;
import com.starads.generic.GenericController;
import com.starads.orch.GeofenceOrch;
import com.starads.repository.entity.Geofence;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.GEOFENCE_API)
public class GeofenceController extends GenericController<GeofenceDto, Geofence> {

	@Autowired
	public GeofenceController(GeofenceOrch orch) {
		super(orch);
	}

}
