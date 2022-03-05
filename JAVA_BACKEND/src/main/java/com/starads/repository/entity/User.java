package com.starads.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;

import com.starads.generic.GenericEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USERS")
public class User extends GenericEntity<User> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username", columnDefinition = "VARCHAR(100)", nullable = false)
	private String username;

	@Column(name = "firstname", columnDefinition = "VARCHAR(100)", nullable = false)
	private String firstname;

	@Column(name = "lastname", columnDefinition = "VARCHAR(100)")
	private String lastname;

	@Column(name = "account_type", columnDefinition = "VARCHAR(50)", nullable = false)
	@Enumerated(EnumType.STRING)
	private UserType accountType;

	@Column(name = "customer_id", nullable = false)
	private Long customerId;

	@Override
	public void update(User user) {
		if (StringUtils.isNotBlank(user.getUsername()))
			this.username = user.getUsername();
		if (StringUtils.isNotBlank(user.getFirstname()))
			this.firstname = user.getFirstname();
		if (StringUtils.isNotBlank(user.getLastname()))
			this.lastname = user.getLastname();
		if (user.getCustomerId() != null)
			this.customerId = user.getCustomerId();
	}

}
