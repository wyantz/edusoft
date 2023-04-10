/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
@Table(name = "T_USERROLE")
public class UserRole {
	@EmbeddedId
	private UserRoleId id;
}
