package com.app.services;

import java.util.List;

import com.app.dto.ValidateUser;
import com.app.pojos.Users;

public interface IUsersService {
	List<Users> getAllUsers();
	Users addUser(Users user);
	String deleteUser(long userId);
	Users getDetails(long userId);
	Users updateDetails(Users detachedUSer);
	Users validateUser(ValidateUser user);
}
