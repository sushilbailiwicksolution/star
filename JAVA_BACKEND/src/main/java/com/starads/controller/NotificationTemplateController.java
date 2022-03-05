package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.NotificationTemplateDto;
import com.starads.generic.GenericController;
import com.starads.orch.NotificationTemplateOrch;
import com.starads.repository.entity.NotificationTemplate;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.NOTIFICATION_TEMPLATE_API)
public class NotificationTemplateController extends GenericController<NotificationTemplateDto, NotificationTemplate> {

	@Autowired
	public NotificationTemplateController(NotificationTemplateOrch orch) {
		super(orch);
	}

}
