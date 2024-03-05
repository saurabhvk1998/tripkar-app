package com.app.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString

public class Trips extends BaseEntity{
	
	
	private String heading;
	private String description;
	
	private int price;
	
//	@Lob
//	//@Column(name = "image", columnDefinition="BLOB")
//    private byte[] image;
	private String image;

}
