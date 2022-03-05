package com.starads.repository.entity;

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
@Table(name = "EVENT_PARAM_DETAILS")
public class EventParamDetails extends GenericEntity<EventParamDetails> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private PacketType packetType;

	private Integer paramId;

	private String paramValue;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "event_id", nullable = false)
	private EventDetails eventDetails;

	@Override
	public void update(EventParamDetails eventParamDetails) {
		if (eventParamDetails.getPacketType() != null)
			this.packetType = eventParamDetails.getPacketType();

		if (eventParamDetails.getParamId() != null)
			this.paramId = eventParamDetails.getParamId();

		if (StringUtils.isNotBlank(eventParamDetails.getParamValue()))
			this.paramValue = eventParamDetails.getParamValue();
	}

}
