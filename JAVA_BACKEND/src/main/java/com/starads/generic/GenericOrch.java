package com.starads.generic;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.starads.exceptions.InternalServiceException;
import com.starads.exceptions.ResourceNotFoundException;
import com.starads.generic.dto.GenericDTO;
import com.starads.generic.dto.ResponseDTO;
import com.starads.util.BeansUtil;
import com.starads.util.Constants;
import com.starads.util.ErrorMessages;

public abstract class GenericOrch<DTO extends GenericDTO<DTO>, ENT extends GenericEntity<ENT>> {

	public Logger logger = LoggerFactory.getLogger(GenericOrch.class);

	private final GenericService<ENT> service;

	private GenericValidator<DTO> validator;

	public GenericOrch(GenericService<ENT> service) {
		this.service = service;
	}

	public GenericOrch(GenericService<ENT> service, GenericValidator<DTO> validator) {
		this.service = service;
		this.validator = validator;
	}

	public ResponseDTO get() {
		try {
			List<ENT> list = service.get();
			return BeansUtil.successResponse(Constants.SUCCESS, convertToDTOs(list));
		} catch (Exception e) {
			logger.error("Error while getting data Error{} ", e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseDTO get(Long id) {
		try {
			ENT ent = service.get(id);
			return BeansUtil.successResponse(Constants.SUCCESS, convertToDTO(ent));
		} catch (ResourceNotFoundException e) {
			logger.error("Error while get data for id{} Error{} ", id, e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error("Error while get data for id{} Error{} ", id, e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseDTO update(DTO dto) {
		try {
			if (validator != null)
				validator.validateUpdate(dto);
			ENT ent = convertToEntity(dto);
			ENT savedEnt = service.update(ent);
			return BeansUtil.successResponse(Constants.UPDATED_SUCCESS, convertToDTO(savedEnt));
		} catch (ResourceNotFoundException e) {
			logger.error("Error while updation data {} Error{} ", dto, e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error("Error while updation data {} Error{} ", dto, e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}
	}

	@Transactional
	public ResponseDTO create(DTO dto) {
		try {
			if (validator != null)
				validator.validateCreate(dto);
			ENT ent = convertToEntity(dto);
			ENT savedEnt = service.create(ent);
			return BeansUtil.successResponse(Constants.CREATED_SUCCESS, convertToDTO(savedEnt));
		} catch (ResourceNotFoundException e) {
			logger.error("Error while Creation data {} Error{} ", dto, e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error("Error while Creation data {} Error{} ", dto, e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}
	}

	@Transactional
	public ResponseDTO delete(Long id) {
		try {
			service.delete(id);
			return BeansUtil.successResponse(Constants.DELETED_SUCCESS);
		} catch (ResourceNotFoundException e) {
			logger.error("Error while Creation id {} Error{} ", id, e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error("Error while Creation id {} Error{} ", id, e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}
	}

	public List<DTO> convertToDTOs(List<ENT> ents) {
		List<DTO> dtos = new ArrayList<>();
		for (ENT ent : ents) {
			dtos.add(convertToDTO(ent));

		}
		return dtos;
	}

	abstract protected ENT convertToEntity(DTO dto);

	abstract protected DTO convertToDTO(ENT ent);

	public GenericService<ENT> getService() {
		return this.service;
	}

	public GenericValidator<DTO> getValidator() {
		return this.validator;
	}
}
