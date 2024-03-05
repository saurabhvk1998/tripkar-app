package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.TripsBookingRepository;
import com.app.pojos.TripsBooking;


@Service
@Transactional
public class TripsBookingServiceImpl implements ITripsBookingService{

	//dependency:dao layer i/f
	@Autowired 
	private TripsBookingRepository bookingRepo;
	
	@Override
	public List<TripsBooking> getAllBooking() {
		
		return bookingRepo.findAll();
	}

	@Override
	public TripsBooking addBooking(TripsBooking booking) {
		
		return bookingRepo.save(booking);
	}

	@Override
	public String deleteBooking(long id) {
		bookingRepo.deleteById(id);
		return "trips Booking Details  deleted for ID= "+id;
	}

}
