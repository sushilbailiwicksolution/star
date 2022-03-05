package com.starads.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.starads.generic.dto.ErrorEnum;
import com.starads.generic.dto.ErrorInfo;
import com.starads.generic.dto.ResponseDTO;
import com.starads.generic.dto.ResponseStatus;

@ControllerAdvice
public class PortalExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler({ InvalidRequestException.class })
	protected ResponseEntity<Object> handleInvalidRequest(RuntimeException e, WebRequest request) {
		InvalidRequestException exception = (InvalidRequestException) e;
		return getExceptionDTO(exception.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ InternalServiceException.class })
	protected ResponseEntity<Object> handleInternalServiceException(RuntimeException e, WebRequest request) {
		InternalServiceException exception = (InternalServiceException) e;
		return getExceptionDTO(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler({ ResourceNotFoundException.class })
	protected ResponseEntity<Object> handleResourceNotFoundException(RuntimeException e, WebRequest request) {
		ResourceNotFoundException exception = (ResourceNotFoundException) e;
		return getExceptionDTO(exception.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler({ ServiceParameterException.class })
	protected ResponseEntity<Object> handleServiceParameterException(RuntimeException e, WebRequest request) {
		ServiceParameterException exception = (ServiceParameterException) e;
		return getExceptionDTO(exception.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
	}

	@ExceptionHandler({ UnauthorizedRequestException.class })
	protected ResponseEntity<Object> handleUnauthorizedRequestException(RuntimeException e, WebRequest request) {
		UnauthorizedRequestException exception = (UnauthorizedRequestException) e;
		return getExceptionDTO(exception.getMessage(), HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler({ AccessForbiddenException.class })
	protected ResponseEntity<Object> handleAccessForbiddenException(RuntimeException e, WebRequest request) {
		AccessForbiddenException exception = (AccessForbiddenException) e;
		return getExceptionDTO(exception.getMessage(), HttpStatus.FORBIDDEN);
	}

	private ResponseEntity<Object> getExceptionDTO(String message, HttpStatus httpStatus) {
		ResponseDTO responseDTO = ResponseDTO.builder().status(ResponseStatus.Failure).build();
		ErrorInfo errorInfo = ErrorInfo.builder().errorMessage(message).errorCode(httpStatus.value())
				.errorLevel(ErrorEnum.ERROR).build();
		responseDTO.setErrorInfo(errorInfo);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return new ResponseEntity<Object>(responseDTO, headers, httpStatus);
	}
}
