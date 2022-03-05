package com.starads.generic;

import java.util.List;

import javax.transaction.Transactional;

import com.starads.exceptions.ResourceNotFoundException;
import com.starads.repository.GenericRepository;
import com.starads.util.ErrorMessages;
import com.starads.util.TimeUtil;

public abstract class GenericService<ENT extends GenericEntity<ENT>> {

	private final GenericRepository<ENT> repository;

	public GenericService(GenericRepository<ENT> repository) {
		this.repository = repository;
	}

	public List<ENT> get() {
		return repository.findAll();
	}

	public ENT get(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(ErrorMessages.RESOURCE_NOT_FOUND));
	}

	public ENT update(ENT ent) {
		ENT existEnt = get(ent.getId());
		if (existEnt.getStatus() == EntityStatus.DELETED)
			throw new ResourceNotFoundException(ErrorMessages.RESOURCE_NOT_FOUND);
		existEnt.update(ent);
		existEnt.setUpdateAt(TimeUtil.currentDateTime());
		return repository.save(existEnt);
	}

	public ENT create(ENT ent) {
		ent.setCreatedAt(TimeUtil.currentDateTime());
		ent.setUpdateAt(TimeUtil.currentDateTime());
		return repository.save(ent);
	}

	@Transactional
	public void delete(Long id) {
		ENT ent = get(id);
		if (ent.getStatus() == EntityStatus.DELETED)
			throw new ResourceNotFoundException(ErrorMessages.RESOURCE_NOT_FOUND);
		ent.setStatus(EntityStatus.DELETED);
		ent.setUpdateAt(TimeUtil.currentDateTime());
		repository.save(ent);
	}

	public GenericRepository<ENT> getRepository() {
		return this.repository;
	}
}
