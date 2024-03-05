package com.app.dto;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ValidateUser {
private String email;
private String password;
public String getEmail() {
	return email;
}

public void setPassword(String password) {
	Base64.Encoder encoder = Base64.getEncoder();  
    String normalString = password;
    String encodedString = encoder.encodeToString(   // encrypt password in database field
    normalString.getBytes(StandardCharsets.UTF_8) );
    this.password = encodedString;
}

}
