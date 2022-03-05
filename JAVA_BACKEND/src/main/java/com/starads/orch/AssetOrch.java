package com.starads.orch;

import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.dto.AssetDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.Asset;
import com.starads.services.AssetService;
import com.starads.util.Constants;

@Service
public class AssetOrch extends GenericOrch<AssetDto, Asset> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public AssetOrch(AssetService service) {
		super(service);
	}

	@Override
	protected Asset convertToEntity(AssetDto dto) {
		Asset ent = modelMapper.map(dto, Asset.class);
		ent.setSymbolStrokeSize(
				dto.getSymbolStrokeSize() == null ? Constants.SYMBOL_STROKE_SIZE : dto.getSymbolStrokeSize());
		ent.setSymbolStrokeColor(StringUtils.isBlank(dto.getSymbolStrokeColor()) ? Constants.SYMBOL_STROKE_COLOR
				: dto.getSymbolStrokeColor());
		ent.setSymbolColor(StringUtils.isBlank(dto.getSymbolColor()) ? Constants.SYMBOL_COLOR : dto.getSymbolColor());
		ent.setTrackColor(StringUtils.isBlank(dto.getTrackColor()) ? Constants.TRACK_COLOR : dto.getTrackColor());
		ent.setName(StringUtils.isBlank(dto.getName()) ? dto.getEsn() : dto.getName());
		ent.setStatus(EntityStatus.ACTIVE);
		return ent;
	}

	@Override
	protected AssetDto convertToDTO(Asset ent) {
		AssetDto dto = modelMapper.map(ent, AssetDto.class);
		return dto;
	}

}
