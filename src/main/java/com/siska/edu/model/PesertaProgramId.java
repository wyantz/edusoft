/**
 * 
 */
package com.siska.edu.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class PesertaProgramId implements Serializable {
	private static final long serialVersionUID = -2417903319115301268L;
	
	@Column(name = "PRPBID")
	private Integer programPembelajaranId;
	
	@Column(name = "PRPBAID")
	private Integer angkatan;
	
	@Column(name = "BIOID")
	private Long biodataId;
}
