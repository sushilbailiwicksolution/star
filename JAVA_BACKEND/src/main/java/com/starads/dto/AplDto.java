package com.starads.dto;

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
public class AplDto implements GenericDTO<AplDto> {

	private Long id;

	// Mandatory

	private List<AplItemDto> aplItems;

	// Optional

	private String esn;

	private Long customerId;

	private String version;

}
