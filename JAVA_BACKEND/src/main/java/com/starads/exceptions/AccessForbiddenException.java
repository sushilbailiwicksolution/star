package com.starads.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class AccessForbiddenException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public AccessForbiddenException(Throwable cause) {
		super(cause);
	}

	public AccessForbiddenException() {
		super();
	}

	public AccessForbiddenException(String message) {
		super(message);
	}
}
