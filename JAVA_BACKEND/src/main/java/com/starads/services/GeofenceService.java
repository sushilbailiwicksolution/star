package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.GeofenceRepository;
import com.starads.repository.entity.Geofence;

@Service
public class GeofenceService extends GenericService<Geofence> {

	@Autowired
	public GeofenceService(GeofenceRepository repository) {
		super(repository);
	}
}
