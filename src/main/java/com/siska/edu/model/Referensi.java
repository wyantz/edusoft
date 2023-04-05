/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Semua data referensi diletakkan disini
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
@Table(name = "T_REF")
public class Referensi {
	@EmbeddedId
	private ReferensiId id;
	
	@Column(name = "REFKET", length = 100)
	private String keterangan;
}
