package com.starads.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.starads.repository.entity.User;
import com.starads.repository.entity.UserType;

@Repository
public interface UserRepository extends GenericRepository<User> {

	public List<User> findByAccountType(UserType accountType);
}
