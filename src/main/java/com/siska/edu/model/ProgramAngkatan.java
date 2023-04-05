/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Data;

/**
 * Menyimpan data angkatan per program
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@Builder
@Entity
@Table(name = "T_PROGANGKATAN")
public class ProgramAngkatan {
	@EmbeddedId
	private ProgramAngkatanId id;
	
	@Column(name = "PRPBTHMASUK")
	private Integer tahunMasuk;
}
