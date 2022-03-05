package com.starads.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "NOTIFICATION_TEMPLATE")
public class NotificationTemplate extends GenericEntity<NotificationTemplate> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Required

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "subject", nullable = false)
	private String subject;

	@Column(name = "body", nullable = false)
	private String body;

	@Override
	public void update(NotificationTemplate template) {

		if (StringUtils.isNotBlank(template.getName()))
			this.name = template.getName();
		if (StringUtils.isNotBlank(template.getSubject()))
			this.subject = template.getSubject();
		if (StringUtils.isNotBlank(template.getBody()))
			this.body = template.getBody();

	}

}
