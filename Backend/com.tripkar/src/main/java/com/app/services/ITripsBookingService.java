package com.app.services;

import java.util.List;

import com.app.pojos.TripsBooking;

public interface ITripsBookingService {
	List<TripsBooking> getAllBooking();
	TripsBooking addBooking(TripsBooking booking);
	String deleteBooking(long id);
}
