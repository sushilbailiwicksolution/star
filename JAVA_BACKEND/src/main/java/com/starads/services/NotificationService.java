package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.NotificationRepository;
import com.starads.repository.entity.Notification;

@Service
public class NotificationService extends GenericService<Notification> {

	@Autowired
	public NotificationService(NotificationRepository repository) {
		super(repository);
	}
}
