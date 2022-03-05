package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.dto.GroupDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.Group;
import com.starads.services.GroupService;

@Service
public class GroupOrch extends GenericOrch<GroupDto, Group> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public GroupOrch(GroupService service) {
		super(service);
	}

	@Override
	protected Group convertToEntity(GroupDto dto) {
		Group ent = modelMapper.map(dto, Group.class);
		ent.setStatus(EntityStatus.ACTIVE);
		return ent;
	}

	@Override
	protected GroupDto convertToDTO(Group ent) {
		GroupDto dto = modelMapper.map(ent, GroupDto.class);
		return dto;
	}

}
