package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Enquiry;

public interface EnquiryRepository extends JpaRepository<Enquiry,Long> {

}
