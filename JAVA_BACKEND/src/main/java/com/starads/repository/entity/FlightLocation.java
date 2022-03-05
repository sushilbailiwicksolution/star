package com.starads.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "FLIGHT_LOCATION")
public class FlightLocation extends GenericEntity<FlightLocation> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Required

	@Column(name = "sequence", nullable = false)
	private Integer sequence;

	@Column(name = "type", nullable = false)
	private String type;

	@Column(name = "leg_time", nullable = false)
	private Integer legTime;

	@Column(name = "latitude", nullable = false)
	private Float latitude;

	@Column(name = "longitude", nullable = false)
	private Float longitude;

	// Optional
	@Column(name = "altitude", nullable = false)
	private Integer altitude;

	@Column(name = "radius", nullable = false)
	private Integer radius;

	@Column(name = "buffer_height", nullable = false)
	private Integer bufferHeight;

	@Column(name = "buffer_width", nullable = false)
	private Integer bufferWidth;

	@Column(name = "stage", nullable = false)
	private String stage;

	@Column(name = "stop_time", nullable = false)
	private Integer stopTime;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "flight_plan_id", nullable = false)
	private FlightPlan flightPlan;

	@Override
	public void update(FlightLocation flightLocation) {
		if (flightLocation.getSequence() != null)
			this.sequence = flightLocation.getSequence();

		if (StringUtils.isNotBlank(flightLocation.getType()))
			this.type = flightLocation.getType();

		if (flightLocation.getLegTime() != null)
			this.legTime = flightLocation.getLegTime();

		if (flightLocation.getLatitude() != null)
			this.latitude = flightLocation.getLatitude();

		if (flightLocation.getLongitude() != null)
			this.longitude = flightLocation.getLongitude();

		if (flightLocation.getAltitude() != null)
			this.altitude = flightLocation.getAltitude();

		if (flightLocation.getRadius() != null)
			this.radius = flightLocation.getRadius();

		if (flightLocation.getBufferHeight() != null)
			this.bufferHeight = flightLocation.getBufferHeight();

		if (flightLocation.getBufferWidth() != null)
			this.bufferWidth = flightLocation.getBufferWidth();

		if (flightLocation.getStopTime() != null)
			this.stopTime = flightLocation.getStopTime();

		if (StringUtils.isNotBlank(flightLocation.getStage()))
			this.stage = flightLocation.getStage();
	}

}
