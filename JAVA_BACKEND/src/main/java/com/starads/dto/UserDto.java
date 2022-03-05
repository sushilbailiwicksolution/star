package com.starads.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import com.starads.generic.dto.GenericDTO;
import com.starads.repository.entity.UserType;
import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements GenericDTO<UserDto> {
	private Long id;

	@NotBlank
	private String username;

	@NotBlank
	private String firstname;

	private String lastname;

	@NotBlank
	private UserType accountType;

	@NotNull
	@Min(1)
	private Long customerId;
}
