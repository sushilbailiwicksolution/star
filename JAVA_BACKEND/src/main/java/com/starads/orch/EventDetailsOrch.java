package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.starads.dto.EventDetailsDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.EventDetails;
import com.starads.repository.entity.EventParamDetails;
import com.starads.services.EventDetailsService;

@Service
public class EventDetailsOrch extends GenericOrch<EventDetailsDto, EventDetails> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public EventDetailsOrch(EventDetailsService service) {
		super(service);
	}

	@Override
	protected EventDetails convertToEntity(EventDetailsDto dto) {
		EventDetails ent = modelMapper.map(dto, EventDetails.class);
		ent.setStatus(EntityStatus.ACTIVE);
		if (!CollectionUtils.isEmpty(dto.getEventParamDetails())) {
			for (EventParamDetails eventParamDetail : ent.getEventParamDetails()) {
				eventParamDetail.setStatus(EntityStatus.ACTIVE);
				eventParamDetail.setEventDetails(ent);
			}
		}
		return ent;
	}

	@Override
	protected EventDetailsDto convertToDTO(EventDetails ent) {
		EventDetailsDto dto = modelMapper.map(ent, EventDetailsDto.class);
		return dto;
	}

}
