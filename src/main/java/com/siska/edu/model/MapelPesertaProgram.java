/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@EqualsAndHashCode(callSuper = true)
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
