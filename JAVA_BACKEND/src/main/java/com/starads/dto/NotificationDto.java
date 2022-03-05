package com.starads.dto;

import java.util.List;

import com.starads.generic.dto.GenericDTO;
import com.starads.repository.entity.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto implements GenericDTO<NotificationDto> {
	private Long id;

	private String name;

	private String timezone;

	private NotificationType type;

	private Long customerId;

	private Long notificationTemplateId;

	private List<NotificationEmailDto> emails;

}
