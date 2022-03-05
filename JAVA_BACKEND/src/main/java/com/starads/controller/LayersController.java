package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.LayersDto;
import com.starads.generic.GenericController;
import com.starads.orch.LayersOrch;
import com.starads.repository.entity.Layers;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.LAYERS_API)
public class LayersController extends GenericController<LayersDto, Layers> {

	@Autowired
	public LayersController(LayersOrch orch) {
		super(orch);
	}

}
