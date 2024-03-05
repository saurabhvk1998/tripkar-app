package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Users;

public interface UsersRepository extends JpaRepository<Users, Long>{
	public Users findByemail(String email);
}
