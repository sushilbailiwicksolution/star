package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.AplDto;
import com.starads.generic.GenericController;
import com.starads.orch.AplOrch;
import com.starads.repository.entity.Apl;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.ASSETS_APL_API)
public class AplController extends GenericController<AplDto, Apl> {

	@Autowired
	public AplController(AplOrch orch) {
		super(orch);
	}

}
