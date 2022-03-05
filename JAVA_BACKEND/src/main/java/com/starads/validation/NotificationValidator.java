package com.starads.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.starads.dto.NotificationDto;
import com.starads.exceptions.InternalServiceException;
import com.starads.exceptions.InvalidRequestException;
import com.starads.exceptions.ResourceNotFoundException;
import com.starads.exceptions.ServiceParameterException;
import com.starads.generic.GenericValidator;
import com.starads.services.NotificationTemplateService;
import com.starads.util.ErrorMessages;

@Component
public class NotificationValidator implements GenericValidator<NotificationDto> {

	public Logger logger = LoggerFactory.getLogger(NotificationValidator.class);

	@Autowired
	private NotificationTemplateService notificationTemplateService;

	@Override
	public void validateCreate(NotificationDto dto) throws ResourceNotFoundException, InternalServiceException,
			InvalidRequestException, ServiceParameterException {
		try {
			notificationTemplateService.get(dto.getNotificationTemplateId());
		} catch (ResourceNotFoundException e) {
			logger.error("Notification Template Doesn't Exist TemplateId:{}", dto.getNotificationTemplateId());
			throw new ResourceNotFoundException(ErrorMessages.NOTIFICATION_TEMPLATE_NOT_FOUND);
		} catch (Exception e) {
			logger.error("Error while getting Notification Template:{}  Error{} ", dto.getNotificationTemplateId(),
					e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public void validateUpdate(NotificationDto dto) throws ResourceNotFoundException, InternalServiceException,
			InvalidRequestException, ServiceParameterException {
		// TODO Auto-generated method stub

	}

}
