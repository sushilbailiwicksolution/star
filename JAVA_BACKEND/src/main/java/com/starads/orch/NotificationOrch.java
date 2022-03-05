package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.starads.dto.NotificationDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.Notification;
import com.starads.repository.entity.NotificationEmail;
import com.starads.services.NotificationService;
import com.starads.validation.NotificationValidator;

@Service
public class NotificationOrch extends GenericOrch<NotificationDto, Notification> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public NotificationOrch(NotificationService service, NotificationValidator validator) {
		super(service, validator);
	}

	@Override
	protected Notification convertToEntity(NotificationDto dto) {
		Notification ent = modelMapper.map(dto, Notification.class);
		ent.setStatus(EntityStatus.ACTIVE);
		if (!CollectionUtils.isEmpty(dto.getEmails())) {
			for (NotificationEmail notificationEmail : ent.getEmails()) {
				notificationEmail.setStatus(EntityStatus.ACTIVE);
				notificationEmail.setNotification(ent);
			}
		}
		return ent;
	}

	@Override
	protected NotificationDto convertToDTO(Notification ent) {
		NotificationDto dto = modelMapper.map(ent, NotificationDto.class);
		return dto;
	}

}
