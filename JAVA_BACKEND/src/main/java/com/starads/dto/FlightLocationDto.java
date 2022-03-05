package com.starads.dto;

import com.starads.generic.dto.GenericDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightLocationDto implements GenericDTO<FlightLocationDto> {

	private Long id;

	// Required

	private Integer sequence;

	private String type;

	private Integer legTime;

	private Float latitude;

	private Float longitude;

	// Optional
	private Integer altitude;

	private Integer radius;

	private Integer bufferHeight;

	private Integer bufferWidth;

	private String stage;

	private Integer stopTime;

}
