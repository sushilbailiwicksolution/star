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
public class CustomerDto implements GenericDTO<CustomerDto> {

	private Long id;

	private String name;

	private String email;

	private String address;

	private String website;

	private String phoneNumber;

	private String countryCode;

}
