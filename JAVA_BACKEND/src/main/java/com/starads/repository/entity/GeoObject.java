package com.starads.repository.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "GEO_OBJECT")
public class GeoObject extends GenericEntity<GeoObject> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String type;

	private String bufferDistance;

	private String geom;

	private String geoFormat;

	private Integer srid;

	@OneToOne(mappedBy = "geoObject")
	private Landmark landmark;

	@Override
	public void update(GeoObject geoObject) {
		if (StringUtils.isNotBlank(geoObject.getType()))
			this.type = geoObject.getType();
		if (StringUtils.isNotBlank(geoObject.getBufferDistance()))
			this.bufferDistance = geoObject.getBufferDistance();
		if (StringUtils.isNotBlank(geoObject.getGeom()))
			this.geom = geoObject.getGeom();
		if (StringUtils.isNotBlank(geoObject.getGeoFormat()))
			this.geoFormat = geoObject.getGeoFormat();

	}

}
