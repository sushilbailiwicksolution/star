package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.AssetDto;
import com.starads.dto.AssetEventConfirmDto;
import com.starads.generic.GenericController;
import com.starads.generic.dto.ResponseDTO;
import com.starads.orch.AssetOrch;
import com.starads.repository.entity.Asset;
import com.starads.repository.entity.UserType;
import com.starads.util.BeansUtil;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.ASSETS_API)
public class AssetController extends GenericController<AssetDto, Asset> {

	@Autowired
	public AssetController(AssetOrch orch) {
		super(orch);
	}

	@GetMapping(value = "/locations", produces = { Constants.APPLICATION_JSON })
	public ResponseDTO locations(@PathVariable("account-type") UserType accountType) {
		return BeansUtil.successResponse("Need to Understand", null);
	}

	@GetMapping(value = "/{asset_id}/trips", produces = { Constants.APPLICATION_JSON })
	public ResponseDTO assets(@PathVariable("asset_id") Long asset_id) {
		return BeansUtil.successResponse("Need to Understand", null);
	}

	@GetMapping(value = "/{asset_id}/trips/{trip_id}", produces = { Constants.APPLICATION_JSON })
	public ResponseDTO trips(@PathVariable("asset_id") Long asset_id, @PathVariable("trip_id") Long trip_id) {
		return BeansUtil.successResponse("Need to Understand", null);
	}

	@GetMapping(value = "/events", produces = { Constants.APPLICATION_JSON })
	public ResponseDTO events() {
		return BeansUtil.successResponse("Need to Understand", null);
	}

	@GetMapping(value = "/{asset_id}/trips/{trip_id}/events", produces = { Constants.APPLICATION_JSON })
	public ResponseDTO tripsEvents(@PathVariable("asset_id") Long asset_id, @PathVariable("trip_id") Long trip_id) {
		return BeansUtil.successResponse("Need to Understand", null);
	}

	@PutMapping(value = "/events/confirm", produces = { Constants.APPLICATION_JSON })
	public ResponseDTO tripsEventsConfirm(@RequestBody AssetEventConfirmDto dto) {
		return BeansUtil.successResponse("Need to Understand", null);
	}
}
