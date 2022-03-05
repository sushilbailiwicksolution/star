package com.starads.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.starads.dto.UserDto;
import com.starads.generic.GenericController;
import com.starads.generic.dto.ResponseDTO;
import com.starads.orch.UserOrch;
import com.starads.repository.entity.User;
import com.starads.repository.entity.UserType;
import com.starads.util.Constants;

@RestController
@RequestMapping(Constants.USER_API)
public class UserController extends GenericController<UserDto, User> {

	@Autowired
	public UserController(UserOrch orch) {
		super(orch);
	}

	@GetMapping(value = "/by-type/{account-type}", produces = { Constants.APPLICATION_JSON })
	public ResponseDTO findByConnector(@PathVariable("account-type") UserType accountType) {
		UserOrch orch = (UserOrch) getOrch();
		return orch.getUserByAccountType(accountType);
	}
}
