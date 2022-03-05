package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.NotificationDto;
import com.starads.generic.GenericController;
import com.starads.orch.NotificationOrch;
import com.starads.repository.entity.Notification;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.NOTIFICATION_API)
public class NotificationController extends GenericController<NotificationDto, Notification> {

	@Autowired
	public NotificationController(NotificationOrch orch) {
		super(orch);
	}

}
