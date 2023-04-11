/**
 * 
 */
package com.siska.edu.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Informasi siswa disimpan disini
 * 
 * 
 * @author Awiyanto Ajisasongko
 *
 * Mar 22, 2023
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "T_PESERTAPROGRAM")
public class PesertaProgram {
	@EmbeddedId
	private PesertaProgramId id;
	
	@Column(name = "PPTHMASUK")
	private Integer tahunMasuk;
	
	@Column(name = "PPTGLMASUK")
	private LocalDateTime tanggalMasuk;
	
	private Integer currentLevel;
}
