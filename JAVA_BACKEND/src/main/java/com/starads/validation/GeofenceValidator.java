package com.starads.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.starads.dto.GeofenceDto;
import com.starads.exceptions.InternalServiceException;
import com.starads.exceptions.InvalidRequestException;
import com.starads.exceptions.ResourceNotFoundException;
import com.starads.exceptions.ServiceParameterException;
import com.starads.generic.GenericValidator;
import com.starads.services.LayersService;
import com.starads.util.ErrorMessages;

@Component
public class GeofenceValidator implements GenericValidator<GeofenceDto> {

	public Logger logger = LoggerFactory.getLogger(GeofenceValidator.class);

	@Autowired
	private LayersService layersService;

	@Override
	public void validateCreate(GeofenceDto dto) throws ResourceNotFoundException, InternalServiceException,
			InvalidRequestException, ServiceParameterException {
		try {
			layersService.get(dto.getLayerId());
		} catch (ResourceNotFoundException e) {
			logger.error("Validation Error Layer Doesn't Exist LayerId:{}", dto.getLayerId());
			throw new ResourceNotFoundException(ErrorMessages.LAYERS_NOT_FOUND);
		} catch (Exception e) {
			logger.error("Validation Error while getting LayersId:{}  Error{} ", dto.getLayerId(), e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}

	}

	@Override
	public void validateUpdate(GeofenceDto dto) throws ResourceNotFoundException, InternalServiceException,
			InvalidRequestException, ServiceParameterException {
		// TODO Auto-generated method stub

	}

}
