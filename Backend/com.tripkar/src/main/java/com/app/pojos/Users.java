package com.app.pojos;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity

@NoArgsConstructor

@AllArgsConstructor

@Getter
//@Setter

@ToString

public class Users extends BaseEntity {
	

	@Column(length = 30)
	private String userName;
	@Column(length = 30, unique = true) // unique constraint
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	@Column(length = 10)
	private String mobNumber;

	@Transient
	private @NonNull String street;
	@Transient
	private @NonNull String city;
	@Transient
	private int pincode;

	public Users(String userName, String email, String password, String mobNumber) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.mobNumber = mobNumber;
	}
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	List<Enquiry> enquries;
	
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch=FetchType.EAGER)//
	List<TripsBooking> bookings;
	
	@JsonIgnore
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)//mappedBy = "user",
	Address address;

	public void setPassword(String password) {
		Base64.Encoder encoder = Base64.getEncoder();  
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
        normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setMobNumber(String mobNumber) {
		this.mobNumber = mobNumber;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public void setEnquries(List<Enquiry> enquries) {
		this.enquries = enquries;
	}

	public void setBookings(List<TripsBooking> bookings) {
		this.bookings = bookings;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	
	

}
