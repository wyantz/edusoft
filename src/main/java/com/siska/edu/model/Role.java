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
 * @author wyant
 *
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "T_ROLE")
public class Role {
	@Id
	@Column(name = "RLID", length = 50)
	private String id;
	
	@Column(name = "RLNM", length = 100)
	private String name;
}
