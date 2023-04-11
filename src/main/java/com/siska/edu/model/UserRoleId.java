/**
 * 
 */
package com.siska.edu.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * @author Awiyanto Ajisasongko
 *
 * Apr 9, 2023
 */
@Embeddable
public class UserRoleId implements Serializable {
	private static final long serialVersionUID = 8873015071621580930L;
	
	@Column(name = "RLID", nullable = false, length = 50)
	private String roleId;
	
	@Column(name = "USRNM", nullable = false, length = 50)
	private String userName;
}
