package com.starads.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.starads.generic.GenericEntity;

@NoRepositoryBean
public interface GenericRepository<ENT extends GenericEntity<ENT>> extends JpaRepository<ENT, Long> {
}
