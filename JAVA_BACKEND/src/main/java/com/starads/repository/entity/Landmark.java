package com.starads.repository.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
@Table(name = "LANDMARK")
public class Landmark extends GenericEntity<Landmark> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Required

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "location_type", nullable = false)
	private String locationType;

	@Column(name = "comments", nullable = false)
	private String comments;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "geo_object_id", referencedColumnName = "id")
	private GeoObject geoObject;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "layer_id", nullable = false)
	private Layers layers;

	@Override
	public void update(Landmark landmark) {

		if (StringUtils.isNotBlank(landmark.getName()))
			this.name = landmark.getName();

		if (StringUtils.isNotBlank(landmark.getLocationType()))
			this.locationType = landmark.getLocationType();

		if (StringUtils.isNotBlank(landmark.getComments()))
			this.comments = landmark.getComments();

	}

}
