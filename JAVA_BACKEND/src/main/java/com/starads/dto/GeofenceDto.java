package com.starads.dto;

import java.util.List;

import com.starads.generic.dto.GenericDTO;
import com.starads.repository.entity.EventSeverity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeofenceDto implements GenericDTO<GeofenceDto> {
	private Long id;

	private String name;

	private Integer bufferDistance;

	private String description;
	private Integer minAltitude;

	private Integer maxAltitude;

	private Float minVelocity;

	private Float maxVelocity;

	private EventSeverity eventSeverity;

	private String scheduleStartTime;

	private String scheduleEndTime;

	private Long customerId;

	private List<Long> notifications;

	private List<Long> assets;

	private Long layerId;
}
