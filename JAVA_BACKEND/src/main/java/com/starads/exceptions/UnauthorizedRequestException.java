package com.starads.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UnauthorizedRequestException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public UnauthorizedRequestException(Throwable cause) {
		super(cause);
	}

	public UnauthorizedRequestException() {
		super();
	}

	public UnauthorizedRequestException(String message) {
		super(message);
	}

}
