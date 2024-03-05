package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.TripsBooking;
import com.app.pojos.Users;
import com.app.services.ITripsBookingService;
import com.app.services.IUsersService;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


@RestController
@RequestMapping("/booking")
@CrossOrigin

public class TripsBookingRestController {
	//dependency : service layer i/f
	
	@Autowired
	ITripsBookingService bookingService;
	
	@Autowired
	IUsersService userService;
	

	public TripsBookingRestController()
	{
		System.out.println("in ctor "+getClass().getName());
	}
	
	//add REST API endpoint : for getting all usersBooking
	
	@GetMapping
	public List<TripsBooking> fetchAllUserBooking()
	{
		System.out.println("in fetch all users destination booking");
		return bookingService.getAllBooking();
	}
	
	
	@PostMapping
	public ResponseEntity<TripsBooking> addNewTripsBooking(@RequestBody TripsBooking booking)
	{
		System.out.println("in add user booking "+booking);
		try {
			
			System.out.println(booking.getUserId());
			Users user = userService.getDetails(booking.getUserId());
			booking.setUser(user);
			TripsBooking tBook = bookingService.addBooking(booking);
		return ResponseEntity.status(HttpStatus.CREATED).body(tBook);
		}catch(RuntimeException e) {
			System.out.println("err in add "+e);
//			return new ResponseEntity<>( new ErrorResponse("Adding user destination booking failed!!!!!",e.getMessage() ),
//					HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDTO> deleteTripsBooking(@PathVariable int id)
	{
		System.out.println("in delete user booking  details " +id);
		return ResponseEntity.ok(new ResponseDTO( bookingService.deleteBooking(id)));
	}
}