package com.starads.generic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorInfo {
	private Integer errorCode;
	private ErrorEnum errorLevel;
	private String errorMessage;
}
