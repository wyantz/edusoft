/**
 * 
 */
package com.siska.edu.model;

import java.time.LocalDate;

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
	
//	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-DDTHH:mm:ss")
	@Column(name = "PPTGLMASUK")
	private LocalDate tanggalMasuk;
	
	@Column(name = "current_level")
	private Integer currentLevel;
}
