package com.starads.dto;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.starads.generic.dto.GenericDTO;
import com.starads.repository.entity.EventParamDetails;
import com.starads.repository.entity.PacketType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDetailsDto implements GenericDTO<EventDetailsDto> {

	private Long id;

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

	private List<EventParamDetailsDto> eventParamDetails;

}
