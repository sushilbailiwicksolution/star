package com.starads.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class ServiceParameterException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ServiceParameterException(Throwable cause) {
		super(cause);
	}

	public ServiceParameterException() {
		super();
	}

	public ServiceParameterException(String message) {
		super(message);
	}
}
