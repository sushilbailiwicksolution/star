package com.starads.orch;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.starads.dto.LayersDto;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.repository.entity.Landmark;
import com.starads.repository.entity.Layers;
import com.starads.services.LayersService;

@Service
public class LayersOrch extends GenericOrch<LayersDto, Layers> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public LayersOrch(LayersService service) {
		super(service);
	}

	@Override
	protected Layers convertToEntity(LayersDto dto) {
		Layers layer = modelMapper.map(dto, Layers.class);
		layer.setStatus(EntityStatus.ACTIVE);
		if (!CollectionUtils.isEmpty(dto.getLandmarks())) {
			for (Landmark landmark : layer.getLandmarks()) {
				landmark.setStatus(EntityStatus.ACTIVE);
				landmark.setLayers(layer);
				landmark.getGeoObject().setStatus(EntityStatus.ACTIVE);
				landmark.getGeoObject().setLandmark(landmark);
			}
		}
		return layer;
	}

	@Override
	protected LayersDto convertToDTO(Layers ent) {
		LayersDto flightPlanDto = modelMapper.map(ent, LayersDto.class);
		return flightPlanDto;
	}

}
