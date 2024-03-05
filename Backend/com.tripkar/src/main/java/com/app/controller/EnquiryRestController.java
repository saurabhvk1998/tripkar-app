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

import com.app.dto.ErrorResponse;
import com.app.dto.ResponseDTO;
import com.app.pojos.Enquiry;
import com.app.pojos.Users;
import com.app.services.IEnquiryService;
import com.app.services.IUsersService;

@RestController
@RequestMapping("/enquiry")
@CrossOrigin
public class EnquiryRestController {

	public EnquiryRestController() {
		System.out.println("in ctor " + getClass().getName());
	}
	
	@Autowired
	IUsersService userService;
	
	
	@Autowired
	IEnquiryService enquiryService;

	@GetMapping
	public List<Enquiry> fetchAllEnquiry() {
		return enquiryService.getAllEnquiry();
	}

	@PostMapping
	public ResponseEntity<?> addNewEnquiry(@RequestBody Enquiry enquiry) {
		System.out.println("in add enquiry " + enquiry);
		
		Users user=userService.getDetails(enquiry.getUserId());
		enquiry.setUser(user);
		// invoke service layer's method for saving enquiry
		try {
			return new ResponseEntity<>(enquiryService.addEnquiry(enquiry), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in add enquiry " + e);
			return new ResponseEntity<>(new ErrorResponse("Adding enquiry failed!!!!!", e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// add RESt API to delete enquiry details by id
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDTO> deleteEnquiryDetails(@PathVariable int id) {
		System.out.println("in delete Enquiry details " + id);

		return ResponseEntity.ok(new ResponseDTO(enquiryService.deleteEnquiry(id)));
	}

}
