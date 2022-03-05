package com.starads.dto;

import javax.validation.constraints.NotBlank;

import com.starads.generic.dto.GenericDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupDto implements GenericDTO<GroupDto> {
	private Long id;

	@NotBlank
	private String name;

}
