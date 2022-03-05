package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.AssetRepository;
import com.starads.repository.entity.Asset;

@Service
public class AssetService extends GenericService<Asset> {

	@Autowired
	public AssetService(AssetRepository repository) {
		super(repository);
	}

}
