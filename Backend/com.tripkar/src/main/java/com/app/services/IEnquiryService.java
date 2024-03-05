package com.app.services;

import java.util.List;

import com.app.pojos.Enquiry;

public interface IEnquiryService {
	List<Enquiry> getAllEnquiry();
	Enquiry addEnquiry(Enquiry enquiry);
	String deleteEnquiry(long id);
}
