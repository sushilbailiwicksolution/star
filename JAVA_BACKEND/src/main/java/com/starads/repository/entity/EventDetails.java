package com.starads.repository.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

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
@Table(name = "EVENT_DETAILS")
public class EventDetails extends GenericEntity<EventDetails> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private PacketType packetType;

	private String aircraftId;

	private LocalDateTime scheduledDepartureTime;

	private Float gpsLatitude;

	private Float gpsLongitude;

	private String altitude;

	private String speed;

	private String heading;

	private String startTime;

	private String stopTime;

	private Integer paramCount;

	private String eventId;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<EventParamDetails> eventParamDetails;

	@Override
	public void update(EventDetails eventDetails) {
		if (eventDetails.getPacketType() != null)
			this.packetType = eventDetails.getPacketType();
		if (StringUtils.isNotBlank(eventDetails.getAircraftId()))
			this.aircraftId = eventDetails.getAircraftId();
		if (eventDetails.getScheduledDepartureTime() != null)
			this.scheduledDepartureTime = eventDetails.getScheduledDepartureTime();
		if (eventDetails.getGpsLatitude() != null)
			this.gpsLatitude = eventDetails.getGpsLatitude();
		if (eventDetails.getGpsLongitude() != null)
			this.gpsLongitude = eventDetails.getGpsLongitude();
		if (StringUtils.isNotBlank(eventDetails.getAltitude()))
			this.altitude = eventDetails.getAltitude();
		if (StringUtils.isNotBlank(eventDetails.getSpeed()))
			this.speed = eventDetails.getSpeed();
		if (StringUtils.isNotBlank(eventDetails.getHeading()))
			this.heading = eventDetails.getHeading();
		if (StringUtils.isNotBlank(eventDetails.getStartTime()))
			this.startTime = eventDetails.getStartTime();
		if (StringUtils.isNotBlank(eventDetails.getStopTime()))
			this.stopTime = eventDetails.getStopTime();
		if (eventDetails.getParamCount() != null)
			this.paramCount = eventDetails.getParamCount();
		if (!CollectionUtils.isEmpty(eventDetails.getEventParamDetails())) {
			if (CollectionUtils.isEmpty(this.eventParamDetails))
				this.eventParamDetails = eventDetails.getEventParamDetails();
			else
				this.eventParamDetails.addAll(eventDetails.getEventParamDetails());
		}

	}

}
