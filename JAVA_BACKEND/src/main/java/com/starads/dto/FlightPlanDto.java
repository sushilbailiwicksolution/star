package com.starads.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.starads.generic.dto.GenericDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightPlanDto implements GenericDTO<FlightPlanDto> {
	private Long id;

	// Mandatory

	private String tailNumber;

	private String flightNumber;

	private LocalDateTime scheduledDepartureTime;

	private List<FlightLocationDto> locations;

	// Optional

	private String name;

	private LocalDateTime scheduledArrivalTime;

	private String aircraftModel;

	private String pilots; // User , for multiple Pilots

	private LocalDateTime estimatedDepartureTime;

	private LocalDateTime estimatedArrivalTime;

	private LocalDateTime actualDepartureTime;

	private LocalDateTime actualArrivalTime;

	private Integer routeBufferHeight;

	private Integer routeBufferWidth;

	private Integer locationRadius;

	private Integer state;
}
