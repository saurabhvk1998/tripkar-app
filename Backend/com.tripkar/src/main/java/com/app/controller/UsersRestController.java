package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ErrorResponse;
import com.app.dto.ResponseDTO;
import com.app.dto.ValidateUser;
import com.app.pojos.Address;
import com.app.pojos.Users;
import com.app.services.IUsersService;



@RestController
@RequestMapping("/users")
@CrossOrigin
public class UsersRestController {
	
	
	//dependency :service layer i/f
	@Autowired
	private IUsersService userService;
	
	
	
	
	
	public UsersRestController() {
		System.out.println("in ctor "+getClass().getName());
		
	}
	
	
	
	
	//add REST API endpoint : for getting all users
	@GetMapping
	public ResponseEntity<List<Users>> fetchAllUSers()
	{
		List<Users> users=userService.getAllUsers();
		System.out.println("in fetch all users");
		return ResponseEntity.ok(users);
	}
	
	
	
	//add RESt API to delete user details by id 
	@DeleteMapping("/{userId}")
	public ResponseEntity<ResponseDTO> deleteUserDetails(@PathVariable int userId)//(@PathVariable(name="userId")int id)
	{
		System.out.println("in delete user details " +userId);
		//invoke service layer method for deleting user details
		//return new ResponseEntity<>(new ResponseDTO( userService.deleteUser(userId)),HttpStatus.OK);
		return ResponseEntity.ok(new ResponseDTO( userService.deleteUser(userId)));
	}
	
	
	
	
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable long id)
	{
		System.out.println("in get user detail by id "+id);
		try {
				//Address address=new Address();
				return ResponseEntity.ok(userService.getDetails(id));
			}catch(RuntimeException e)
			{
				System.out.println("err in add "+e);
				return new ResponseEntity<>( new ErrorResponse("Fetching user details failed!!!!!",e.getMessage() ),
						HttpStatus.BAD_REQUEST);
			}
	}
	
	
	
	
	
	
	
	//add REST API to update existing user details
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUSerDetails(@RequestBody Users detachedUSer,@PathVariable long id)
	{
		System.out.println("in update user "+detachedUSer + " "+ id);
		try {
		//invoke service layer method for validating user id
		Users existingUser=userService.getDetails(id);
		//=>user is valid 
		//existingUser=> user details fetched from DB(stale)
		//detachedUSer=>updated user details from front end.
		return ResponseEntity.ok(userService.updateDetails(detachedUSer));
		}catch(RuntimeException e)
		{
			System.out.println("err in add "+e);
			return new ResponseEntity<>( new ErrorResponse("Updating user details failed!!!!!",e.getMessage() ),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	
	
	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody ValidateUser transientUser )
	{
		System.out.println("inside validate user");
			Users user=userService.validateUser(transientUser);
			System.out.println(user.getEmail());
			 if (user != null && user.getPassword().equals(transientUser.getPassword())) {
		            return ResponseEntity.ok(user);
		        } else {
		            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		        }
		
	}
	
	

	
	
	@PostMapping
	public ResponseEntity<?> addNewUserDetails(@Validated @RequestBody Users transientUser)
	{
		System.out.println("in add user "+transientUser);
		Address address= new Address();
		Users user=new Users(transientUser.getUserName(),transientUser.getEmail(),transientUser.getPassword(),transientUser.getMobNumber());
		address.setStreet(transientUser.getStreet());
		address.setCity(transientUser.getCity());
		address.setPincode(transientUser.getPincode());
		
		address.setUser(user);
		user.setAddress(address);
		//invoke service layer's method for saving details
		try {
			Users users = userService.addUser(user);
		return new ResponseEntity<>( users,HttpStatus.CREATED);
		}catch(RuntimeException e)
		{
			System.out.println("err in add "+e);
			return new ResponseEntity<>( new ErrorResponse("Adding user failed!!!!!",e.getMessage() ),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
}
