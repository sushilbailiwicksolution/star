package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.dto.AplDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.Apl;
import com.starads.repository.entity.AplItems;
import com.starads.services.AplService;
import com.starads.util.TimeUtil;

@Service
public class AplOrch extends GenericOrch<AplDto, Apl> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public AplOrch(AplService service) {
		super(service);
	}

	@Override
	protected Apl convertToEntity(AplDto dto) {
		Apl ent = modelMapper.map(dto, Apl.class);
		for (AplItems aplItem : ent.getAplItems()) {
			aplItem.setStatus(EntityStatus.ACTIVE);
			aplItem.setApl(ent);
			aplItem.setCreatedAt(TimeUtil.currentDateTime());
			aplItem.setUpdateAt(TimeUtil.currentDateTime());
		}
		ent.setStatus(EntityStatus.ACTIVE);
		return ent;
	}

	@Override
	protected AplDto convertToDTO(Apl ent) {
		AplDto dto = modelMapper.map(ent, AplDto.class);
		return dto;
	}

}
