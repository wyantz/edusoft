/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.MapsId;
import javax.persistence.Table;

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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_JENISNILAI")
public class JenisNilai {
	@EmbeddedId
	private JenisNilaiId id;
	
	@Column(name = "JNKET", length = 255)
	private String keterangan;

	@Column(name = "JNKRITERIA", length = 255)
	private String kriteria;
}
