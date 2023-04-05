/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Wali siswa disimpan disini
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
@Table(name = "T_WALISISWA")
public class WaliSiswa {
	@EmbeddedId
	private WaliSiswaId id;
}
