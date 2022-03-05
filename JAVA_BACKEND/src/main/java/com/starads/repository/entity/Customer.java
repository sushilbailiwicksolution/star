package com.starads.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "CUSTOMERS")
public class Customer extends GenericEntity<Customer> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", columnDefinition = "VARCHAR(100)", nullable = false)
	private String name;

	@Column(name = "email", columnDefinition = "VARCHAR(100)")
	private String email;

	@Column(name = "address")
	private String address;

	@Column(name = "website")
	private String website;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "country_code", nullable = false)
	private String countryCode;

	@Override
	public void update(Customer customer) {
		if (StringUtils.isNotBlank(customer.getName()))
			this.name = customer.getName();
		if (StringUtils.isNotBlank(customer.getEmail()))
			this.email = customer.getEmail();
		if (StringUtils.isNotBlank(customer.getAddress()))
			this.address = customer.getAddress();
		if (StringUtils.isNotBlank(customer.getWebsite()))
			this.email = customer.getEmail();
		if (StringUtils.isNotBlank(customer.getWebsite()))
			this.website = customer.getWebsite();
		if (StringUtils.isNotBlank(customer.getPhoneNumber()))
			this.phoneNumber = customer.getPhoneNumber();
	}

}
