package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.UserHandlingException;
import com.app.dao.UsersRepository;
import com.app.dto.ValidateUser;
import com.app.pojos.Users;


@Service
@Transactional
public class UsersServiceImpl implements IUsersService{


	


	//dependency:dao layer i/f
	@Autowired 
	private UsersRepository userRepo;
	
	
	@Override
	public List<Users> getAllUsers() {
		//invoke dao's method
		return userRepo.findAll();
	}

	
	@Override
	public Users addUser(Users user) {
		//System.out.println("in service method "+user);
		return userRepo.save(user);  
	}
	
	@Override
	public String deleteUser(long userId) {
		userRepo.deleteById(userId);
		return "user details deleted for ID= "+userId;
	}
	
	
	@Override
	public Users getDetails(long userId) {
		 
		return userRepo.findById(userId).
				orElseThrow(()->new UserHandlingException("Invalid user ID"));
	}
	
	@Override
	public Users updateDetails(Users detachedUSer) {
		
		return userRepo.save(detachedUSer);
	}
	
	
	
	@Override
	public Users validateUser(ValidateUser user) {
		
		return userRepo.findByemail( user.getEmail());
	}
	
	
}
