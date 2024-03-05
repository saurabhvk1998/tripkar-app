package com.app.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Enquiry extends BaseEntity{
	private String name;
	@Column(length=30 ,unique=true)
	private String email;
	private String subject;
	@Column(length=500)
	private String message;
	
	@Transient
	int userId;
	
	
	@JsonIgnore
	@ManyToOne
	Users user;
}
