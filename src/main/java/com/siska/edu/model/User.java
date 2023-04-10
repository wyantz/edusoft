/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Awiyanto Ajisasongko
 *
 * Apr 9, 2023
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "T_USER")
public class User {
	@Id
	@Column(name = "USRNM", length = 50)
	private String name;
	
	@Column(name = "USRPWD", length = 255)
	private String password;
}
