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
public class GeoObjectDto implements GenericDTO<GeoObjectDto> {
	private Long id;

	private String type;

	private String bufferDistance;

	private String geom;

	private String geoFormat;

	private Integer srid;

}
