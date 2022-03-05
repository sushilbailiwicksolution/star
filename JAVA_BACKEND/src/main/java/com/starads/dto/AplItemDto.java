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
public class AplItemDto implements GenericDTO<AplItemDto> {

	private Long id;

	private Long mplId;

	private String units;

	private Integer minVal;

	private Integer maxVal;

	private Integer thresHold;

	private String color;

	private Boolean displayOption;

	private String notification;

	private Integer severity;

}
