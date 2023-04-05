/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Menyimpan informasi mata pelajaran
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
@Table(name = "T_MAPEL")
public class Mapel extends BaseEntity {
	@Id
	@Column(name = "MAPELKD", length = 20)
	private String kode;
	
	@Column(name = "MAPELNM", length = 100)
	private String nama;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "JNKD", length = 20)
	private JenisNilaiEnum kodeJenisNilai;
}
