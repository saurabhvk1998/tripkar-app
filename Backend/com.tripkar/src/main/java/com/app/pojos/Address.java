package com.app.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Address extends BaseEntity {
	private @NonNull String street;
	private @NonNull String city;
	private int pincode;
 
	
	// Foreign key
	@JsonIgnore
	@OneToOne
	Users user;

	

}
