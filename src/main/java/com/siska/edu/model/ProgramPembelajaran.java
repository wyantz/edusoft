/**
 * 
 */
package com.siska.edu.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Berisi data program, misal program reguler, program kelas khusus, program tahfiz, atau apapun.
 * Setiap program akan memiliki angkatan/batch dan informasi angkatan/batch nya ada di {@link ProgramAngkatan}
 * 
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "T_PROGBEL")
public class ProgramPembelajaran {
	@Id
	@Column(name = "PRPBID")
	private Integer id;
	
	@Column(name = "PRPBNM", length = 50)
	private String nama;

	@Column(name = "PRPBLVLAWAL")
	private Integer levelAwal;
	
	@Column(name = "PRPBLVLAKHIR")
	private Integer levelAkhir;
	
	@Column(name = "PRPBDURASILEVEL")
	private Integer durasiLevel;

	@Column(name = "PRPBKET", length = 100)
	private String keterangan;
}
