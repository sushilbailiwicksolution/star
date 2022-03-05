package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.NotificationTemplateRepository;
import com.starads.repository.entity.NotificationTemplate;

@Service
public class NotificationTemplateService extends GenericService<NotificationTemplate> {

	@Autowired
	public NotificationTemplateService(NotificationTemplateRepository repository) {
		super(repository);
	}

}
