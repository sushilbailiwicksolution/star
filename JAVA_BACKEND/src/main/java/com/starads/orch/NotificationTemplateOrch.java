package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.dto.NotificationTemplateDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.NotificationTemplate;
import com.starads.services.NotificationTemplateService;

@Service
public class NotificationTemplateOrch extends GenericOrch<NotificationTemplateDto, NotificationTemplate> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public NotificationTemplateOrch(NotificationTemplateService service) {
		super(service);
	}

	@Override
	protected NotificationTemplate convertToEntity(NotificationTemplateDto dto) {
		NotificationTemplate ent = modelMapper.map(dto, NotificationTemplate.class);
		ent.setStatus(EntityStatus.ACTIVE);

		return ent;
	}

	@Override
	protected NotificationTemplateDto convertToDTO(NotificationTemplate ent) {
		NotificationTemplateDto dto = modelMapper.map(ent, NotificationTemplateDto.class);
		return dto;
	}

}
