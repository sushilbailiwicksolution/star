package com.starads.dto;

import java.util.List;

import com.starads.generic.dto.GenericDTO;
import com.starads.repository.entity.Landmark;
import com.starads.repository.entity.LayersSymbols;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LayersDto implements GenericDTO<LayersDto> {
	private Long id;

	private String name;

	private LayersSymbols symbol;

	private String symbolColor;

	private Integer symbolSize;

	private LayersSymbols defaultSymbol;

	private String defaultSymbolColor;

	private Integer defaultSymbolSize;

	private List<LandmarkDto> landmarks;

	private Integer customerId;

}
