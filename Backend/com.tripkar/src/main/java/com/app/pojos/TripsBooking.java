package com.app.pojos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class TripsBooking extends BaseEntity{
	
	
	private LocalDate checkInDate;
	private LocalDate checkOutDate;
	private String numOfGuests;
	private String isAvaliable;
	private int price;
	private String heading;
	
	
	@Transient
	private int userId;
	
	@JsonIgnore
	@ManyToOne
	Users user;
	
	
	
	
}
