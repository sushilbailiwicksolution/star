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
@Table(name = "NOTIFICATION")
public class Notification extends GenericEntity<Notification> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "timezone", nullable = false)
	private String timezone;

	@Column(name = "type", nullable = false)
	@Enumerated(EnumType.STRING)
	private NotificationType type;

	@Column(name = "customer_id", nullable = false)
	private Long customerId;

	@Column(name = "notification_template_id", nullable = false)
	private Long notificationTemplateId;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<NotificationEmail> emails;

	@Override
	public void update(Notification notification) {
		if (StringUtils.isNotBlank(notification.getName()))
			this.name = notification.getName();

		if (StringUtils.isNotBlank(notification.getTimezone()))
			this.timezone = notification.getTimezone();

		if (notification.getCustomerId() != null)
			this.customerId = notification.getCustomerId();

	}

}
