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
public class AssetDto implements GenericDTO<AssetDto> {

	private Long id;

	private String esn;

	private String vehicletype;

	private String deviceType;

	private Long countryId;

	private Long customerId;

	// Optional

	private String alias;

	private String description;

	private Long symbolStrokeSize;

	private String symbolStrokeColor;

	private String trackColor;

	private String symbolColor;

	private String name;

	private Float symbolSize;

	private Float trackwidth;

	private boolean twoWayMessaging;

	private Integer twoWayMessageMaxLength;

	private String weblink;

	private String assetSerialNumber;

	private String assetRegistrationNumber;

	private String assetMake;

	private String assetModel;

	private String assetColor;

	private String vehicleSerialNumber;

	private String phone;

	private Integer deviceState;

}
