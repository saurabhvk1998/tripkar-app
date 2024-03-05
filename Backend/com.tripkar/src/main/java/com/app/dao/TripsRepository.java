package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Trips;

public interface TripsRepository extends JpaRepository<Trips, Long> {

}
