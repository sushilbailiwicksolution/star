package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.dto.GeofenceDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.Geofence;
import com.starads.services.GeofenceService;
import com.starads.services.LayersService;
import com.starads.validation.GeofenceValidator;

@Service
public class GeofenceOrch extends GenericOrch<GeofenceDto, Geofence> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private LayersService layersService;

	@Autowired
	public GeofenceOrch(GeofenceService service, GeofenceValidator validator) {
		super(service, validator);
	}

	@Override
	protected Geofence convertToEntity(GeofenceDto dto) {
		Geofence geofence = modelMapper.map(dto, Geofence.class);
		geofence.setStatus(EntityStatus.ACTIVE);
		geofence.setLayers(layersService.get(dto.getLayerId()));
		return geofence;
	}

	@Override
	protected GeofenceDto convertToDTO(Geofence ent) {
		GeofenceDto flightPlanDto = modelMapper.map(ent, GeofenceDto.class);
		return flightPlanDto;
	}

}
