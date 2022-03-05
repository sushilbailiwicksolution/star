package com.starads.repository.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
@Table(name = "APL_ITEMS")
public class AplItems extends GenericEntity<AplItems> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "apl_id", nullable = false)
	private Apl apl;

	private Long mplId;

	private String units;

	private Integer minVal;

	private Integer maxVal;

	private Integer thresHold;

	private String color;

	private Boolean displayOption;

	private String notification;

	private Integer severity;

	@Override
	public void update(AplItems source) {
		// TODO Auto-generated method stub

	}

}
