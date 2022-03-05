package com.starads.dto;

import com.starads.generic.dto.GenericDTO;
import com.starads.repository.entity.GeoObject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LandmarkDto implements GenericDTO<LandmarkDto> {
	private Long id;

	private String name;

	private String locationType;

	private String comments;

	private GeoObjectDto geoObject;

}
