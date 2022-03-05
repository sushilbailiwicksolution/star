package com.starads.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.generic.GenericService;
import com.starads.repository.UserRepository;
import com.starads.repository.entity.User;
import com.starads.repository.entity.UserType;

@Service
public class UserService extends GenericService<User> {

	@Autowired
	public UserService(UserRepository repository) {
		super(repository);
	}

	public List<User> getUserByAccountType(UserType accountType) {
		UserRepository repository = (UserRepository) getRepository();
		return repository.findByAccountType(accountType);
	}
}
