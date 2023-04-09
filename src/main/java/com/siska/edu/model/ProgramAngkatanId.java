/**
 * 
 */
package com.siska.edu.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Data;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
//@Builder
@Data
@Embeddable
public class ProgramAngkatanId implements Serializable {
	private static final long serialVersionUID = -2417903319115301268L;
	
	@Column(name = "PRPBID")
	private Integer programPembelajaranId;

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PRPBAID")
	private Integer angkatan;

	public ProgramAngkatanId() {
		super();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProgramAngkatanId other = (ProgramAngkatanId) obj;
		return Objects.equals(angkatan, other.angkatan)
				&& Objects.equals(programPembelajaranId, other.programPembelajaranId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(angkatan, programPembelajaranId);
	}
	
}
