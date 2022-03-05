package com.starads.util;

import org.springframework.http.HttpStatus;

import com.starads.generic.dto.ErrorEnum;
import com.starads.generic.dto.ErrorInfo;
import com.starads.generic.dto.ResponseDTO;
import com.starads.generic.dto.ResponseStatus;

public class BeansUtil {
	public static ResponseDTO successResponse(String message, Object result) {
		return ResponseDTO
				.builder().result(result).status(ResponseStatus.Success).errorInfo(ErrorInfo.builder()
						.errorMessage(message).errorCode(HttpStatus.OK.value()).errorLevel(ErrorEnum.OK).build())
				.build();

	}

	public static ResponseDTO successResponse(String message) {
		return successResponse(message, null);

	}

}
