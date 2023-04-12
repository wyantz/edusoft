/**
 * 
 */
package com.siska.edu.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Informasi atau data person disimpan disini
 * 
 * 
 * @author Awiyanto Ajisasongko
 *
 * Mar 22, 2023
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "T_BIODATA")
public class Biodata extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "biodata_generator")
	@TableGenerator(name = "biodata_generator", table = "T_GENERATOR")
	@Column(name = "BIOID")
	private Long id;
	
	@Column(name = "BIONIK", length = 50)
	private String nik;
	
	@Column(name = "BIONM", length = 100)
	private String nama;
	
	@Column(name = "BIOTGLLAHIR")
	private LocalDate tanggalLahir;
	
	@Column(name = "BIOTMPLAHIR", length = 50)
	private String tempatLahir;
	
	@Column(name = "BIOJK", length = 10)
	private String kodeJenisKelamin;
	
	@Column(name = "BIOASALSEKOLAH", length = 50)
	private String asalSekolah;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "BIOLVLASALSEKOLAH", length = 20)
	private EduLevel levelSekolahAsal;
	
	@Column(name = "BIOPEKERJAAN", length = 10)
	private String kodePekerjaan;
}
