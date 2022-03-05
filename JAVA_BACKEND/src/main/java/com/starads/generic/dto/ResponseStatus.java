package com.starads.generic.dto;

public enum ResponseStatus {
	Success("Success"), Failure("Failure");

	private String status;

	ResponseStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

}
