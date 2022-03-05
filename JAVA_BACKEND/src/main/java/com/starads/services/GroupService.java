package com.starads.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.GroupRepository;
import com.starads.repository.entity.Group;

@Service
public class GroupService extends GenericService<Group> {

	@Autowired
	public GroupService(GroupRepository repository) {
		super(repository);
	}

}
