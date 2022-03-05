package com.starads.repository.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "FLIGHT_PLAN")
public class FlightPlan extends GenericEntity<FlightPlan> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Mandatory

	@Column(name = "tail_number", nullable = false)
	private String tailNumber;

	@Column(name = "flight_number", nullable = false)
	private String flightNumber;

	@Column(name = "scheduled_departure_time", nullable = false)
	private LocalDateTime scheduledDepartureTime;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<FlightLocation> locations;

	// Optional

	@Column(name = "name", nullable = true)
	private String name;

	@Column(name = "scheduled_arrival_time", nullable = true)
	private LocalDateTime scheduledArrivalTime;

	@Column(name = "aircraft_model", nullable = true)
	private String aircraftModel;

	@Column(name = "pilots", nullable = true)
	private String pilots; // User , for multiple Pilots

	@Column(name = "estimated_departure_time", nullable = true)
	private LocalDateTime estimatedDepartureTime;

	@Column(name = "estimated_arrival_time", nullable = true)
	private LocalDateTime estimatedArrivalTime;

	@Column(name = "actual_departure_time", nullable = true)
	private LocalDateTime actualDepartureTime;

	@Column(name = "actual_arrival_time", nullable = true)
	private LocalDateTime actualArrivalTime;

	private Integer routeBufferHeight;

	private Integer routeBufferWidth;

	private Integer locationRadius;

	private Integer state;

	@Override
	public void update(FlightPlan flightPlan) {
		if (StringUtils.isNotBlank(flightPlan.getTailNumber()))
			this.tailNumber = flightPlan.getTailNumber();
		if (StringUtils.isNotBlank(flightPlan.getFlightNumber()))
			this.flightNumber = flightPlan.getFlightNumber();
		if (flightPlan.getScheduledDepartureTime() != null)
			this.scheduledDepartureTime = flightPlan.getScheduledDepartureTime();
		if (!CollectionUtils.isEmpty(flightPlan.getLocations())) {
			if (CollectionUtils.isEmpty(this.locations))
				this.locations = flightPlan.getLocations();
			else
				this.locations.addAll(flightPlan.getLocations());
		}
		if (StringUtils.isNotBlank(flightPlan.getName()))
			this.name = flightPlan.getName();
		if (flightPlan.getScheduledArrivalTime() != null)
			this.scheduledArrivalTime = flightPlan.getScheduledArrivalTime();
		if (StringUtils.isNotBlank(flightPlan.getAircraftModel()))
			this.aircraftModel = flightPlan.getAircraftModel();
		if (StringUtils.isNotBlank(flightPlan.getPilots()))
			this.pilots = flightPlan.getPilots();

		if (flightPlan.getEstimatedDepartureTime() != null)
			this.estimatedDepartureTime = flightPlan.getEstimatedDepartureTime();
		if (flightPlan.getEstimatedArrivalTime() != null)
			this.estimatedArrivalTime = flightPlan.getEstimatedArrivalTime();
		if (flightPlan.getActualDepartureTime() != null)
			this.actualDepartureTime = flightPlan.getActualDepartureTime();
		if (flightPlan.getActualArrivalTime() != null)
			this.actualArrivalTime = flightPlan.getActualArrivalTime();

		if (flightPlan.getRouteBufferHeight() != null)
			this.routeBufferHeight = flightPlan.getRouteBufferHeight();
		if (flightPlan.getRouteBufferWidth() != null)
			this.routeBufferWidth = flightPlan.getRouteBufferWidth();
		if (flightPlan.getLocationRadius() != null)
			this.locationRadius = flightPlan.getLocationRadius();
		if (flightPlan.getState() != null)
			this.state = flightPlan.getState();

	}

}
