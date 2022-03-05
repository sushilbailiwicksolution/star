package com.starads.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "GEOFENCE")
public class Geofence extends GenericEntity<Geofence> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Required

	@Column(name = "name", nullable = false)
	private String name;

	// Optional
	private Integer bufferDistance;

	private String description;

	private Integer minAltitude;

	private Integer maxAltitude;

	private Float minVelocity;

	private Float maxVelocity;

	@Enumerated(EnumType.STRING)
	private EventSeverity eventSeverity;

	private String scheduleStartTime;

	private String scheduleEndTime;

	private Integer customerId;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "layers_id", nullable = false)
	private Layers layers;

	@Override
	public void update(Geofence geofence) {

		if (StringUtils.isNotBlank(geofence.getName()))
			this.name = geofence.getName();

		if (geofence.getBufferDistance() != null)
			this.bufferDistance = geofence.getBufferDistance();

		if (StringUtils.isNotBlank(geofence.getDescription()))
			this.description = geofence.getDescription();

		if (geofence.getMinAltitude() != null)
			this.minAltitude = geofence.getMinAltitude();

		if (geofence.getMaxAltitude() != null)
			this.maxAltitude = geofence.getMaxAltitude();

		if (geofence.getMinVelocity() != null)
			this.minVelocity = geofence.getMinVelocity();

		if (geofence.getMaxVelocity() != null)
			this.maxVelocity = geofence.getMaxVelocity();

		if (StringUtils.isNotBlank(geofence.getScheduleStartTime()))
			this.scheduleStartTime = geofence.getScheduleStartTime();

		if (StringUtils.isNotBlank(geofence.getScheduleEndTime()))
			this.scheduleEndTime = geofence.getScheduleEndTime();

	}

}
