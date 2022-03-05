package com.starads.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;

import com.starads.generic.GenericEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ASSET")
public class Asset extends GenericEntity<Asset> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "esn", nullable = false)
	private String esn;

	@Column(name = "vehicletype", nullable = false)
	private String vehicletype;

	@Column(name = "device_type", nullable = false)
	private String deviceType;

	@Column(name = "country_id", nullable = false)
	private Long countryId;

	@Column(name = "customer_id", nullable = false)
	private Long customerId;

	// Optional

	@Column(name = "alias", nullable = true)
	private String alias;

	@Column(name = "description", nullable = true)
	private String description;

	@Column(name = "symbol_stroke_size", nullable = true)
	private Long symbolStrokeSize;

	@Column(name = "symbolstrokecolor", nullable = true)
	private String symbolStrokeColor;

	@Column(name = "trackcolor", nullable = true)
	private String trackColor;

	@Column(name = "symbolcolor", nullable = true)
	private String symbolColor;

	@Column(name = "name", nullable = true)
	private String name;

	@Column(name = "symbol_size", nullable = true)
	private Float symbolSize;

	@Column(name = "track_width", nullable = true)
	private Float trackwidth;

	@Column(name = "two_way_messaging", nullable = true)
	private boolean twoWayMessaging;

	@Column(name = "two_way_message_max_length", nullable = true)
	private Integer twoWayMessageMaxLength;

	@Column(name = "weblink", nullable = true)
	private String weblink;

	@Column(name = "asset_serial_number", nullable = true)
	private String assetSerialNumber;

	@Column(name = "asset_registration_number", nullable = true)
	private String assetRegistrationNumber;

	@Column(name = "asset_make", nullable = true)
	private String assetMake;

	@Column(name = "asset_model", nullable = true)
	private String assetModel;

	@Column(name = "asset_color", nullable = true)
	private String assetColor;

	@Column(name = "vehicle_serial_number", nullable = true)
	private String vehicleSerialNumber;

	@Column(name = "phone", nullable = true)
	private String phone;

	@Column(name = "device_state", nullable = true)
	private Integer deviceState;

	@Override
	public void update(Asset asset) {
		if (StringUtils.isNotBlank(asset.getEsn()))
			this.esn = asset.getEsn();

		if (StringUtils.isNotBlank(asset.getVehicletype()))
			this.vehicletype = asset.getVehicletype();

		if (StringUtils.isNotBlank(asset.getDeviceType()))
			this.deviceType = asset.getDeviceType();

		if (asset.getCountryId() != null)
			this.countryId = asset.getCountryId();

		if (asset.getCustomerId() != null)
			this.customerId = asset.getCustomerId();
	}

}
