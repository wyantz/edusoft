/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "T_MAPELPESERTA")
public class MapelPesertaProgram extends BaseEntity {
	@EmbeddedId
	private MapelPesertaProgramId id;
	
	@Column(name = "MAPPESNILAI")
	private Integer nilai;
	
	@Column(name = "MAPPESKET", length = 255)
	private String keterangan;

	@Column(name = "MAPPESSARAN", length = 255)
	private String saran;
}
