package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.GroupDto;
import com.starads.generic.GenericController;
import com.starads.orch.GroupOrch;
import com.starads.repository.entity.Group;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.GROUPS_API)
public class GroupController extends GenericController<GroupDto, Group> {

	@Autowired
	public GroupController(GroupOrch orch) {
		super(orch);
	}

}
