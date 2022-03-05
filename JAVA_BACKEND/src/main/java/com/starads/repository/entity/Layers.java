package com.starads.repository.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
@Table(name = "LAYERS")
public class Layers extends GenericEntity<Layers> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	// Optional

	@Enumerated(EnumType.STRING)
	private LayersSymbols symbol;

	private String symbolColor;

	private Integer symbolSize;

	@Enumerated(EnumType.STRING)
	private LayersSymbols defaultSymbol;

	private String defaultSymbolColor;

	private Integer defaultSymbolSize;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Geofence> geofence;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Landmark> landmarks;

	private Integer customerId;

	@Override
	public void update(Layers layer) {
		if (StringUtils.isNotBlank(layer.getName()))
			this.name = layer.getName();
		if (symbol != null)
			this.symbol = layer.getSymbol();
		if (StringUtils.isNotBlank(layer.getSymbolColor()))
			this.symbolColor = layer.getSymbolColor();
		if (symbolSize != null)
			symbolSize = layer.getSymbolSize();

		if (defaultSymbol != null)
			this.defaultSymbol = layer.getDefaultSymbol();
		if (StringUtils.isNotBlank(layer.getDefaultSymbolColor()))
			this.defaultSymbolColor = layer.getDefaultSymbolColor();
		if (defaultSymbolSize != null)
			defaultSymbolSize = layer.getDefaultSymbolSize();
	}

}
