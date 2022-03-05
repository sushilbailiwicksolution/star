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
@Table(name = "APL")
public class Apl extends GenericEntity<Apl> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Mandatory

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<AplItems> aplItems;

	// Optional

	@Column(name = "esn", nullable = true)
	private String esn;

	@Column(name = "customer_id", nullable = true)
	private Long customerId;

	@Column(name = "version", nullable = true)
	private String version;

	@Override
	public void update(Apl apl) {
		if (StringUtils.isNotBlank(apl.getEsn()))
			this.esn = apl.getEsn();
		if (StringUtils.isNotBlank(apl.getVersion()))
			this.version = apl.getVersion();

		if (!CollectionUtils.isEmpty(apl.getAplItems())) {
			if (CollectionUtils.isEmpty(this.aplItems))
				this.aplItems = apl.getAplItems();
			else
				this.aplItems.addAll(apl.getAplItems());
		}

	}

}
