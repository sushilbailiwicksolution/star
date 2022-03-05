package com.starads.generic;

import com.starads.exceptions.InternalServiceException;
import com.starads.exceptions.InvalidRequestException;
import com.starads.exceptions.ResourceNotFoundException;
import com.starads.exceptions.ServiceParameterException;
import com.starads.generic.dto.GenericDTO;

public interface GenericValidator<DTO extends GenericDTO<DTO>> {

	public void validateCreate(DTO dto) throws ResourceNotFoundException, InternalServiceException,
			InvalidRequestException, ServiceParameterException;

	public void validateUpdate(DTO dto) throws ResourceNotFoundException, InternalServiceException,
			InvalidRequestException, ServiceParameterException;
}
