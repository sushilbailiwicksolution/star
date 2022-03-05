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
public class NotificationEmailDto implements GenericDTO<NotificationEmailDto> {

	private Long id;

	private String email;

}
