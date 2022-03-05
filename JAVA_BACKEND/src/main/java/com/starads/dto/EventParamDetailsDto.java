package com.starads.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.starads.generic.dto.GenericDTO;
import com.starads.repository.entity.PacketType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventParamDetailsDto implements GenericDTO<EventParamDetailsDto> {

	private Long id;

	@Enumerated(EnumType.STRING)
	private PacketType packetType;

	private Integer paramId;

	private String paramValue;

}
