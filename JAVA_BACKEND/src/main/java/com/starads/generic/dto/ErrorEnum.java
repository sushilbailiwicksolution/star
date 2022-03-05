package com.starads.generic.dto;

public enum ErrorEnum {
	OK(0), WARN(1), CRITICAL(2), ERROR(3);

	private Integer intValue;

	private ErrorEnum(int intValue) {
		this.intValue = intValue;
	}

	public int intValue() {
		return intValue;
	}
}
