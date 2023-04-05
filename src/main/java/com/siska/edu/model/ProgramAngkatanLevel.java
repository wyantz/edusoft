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
 * Setiap level dari program belajar harus ditentukan sejak awal dan disimpan disini
 * 
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "T_PROGANGLEVEL")
public class ProgramAngkatanLevel extends BaseEntity {
	@EmbeddedId
	private ProgramAngkatanLevelId id;
	
	@Column(name = "PRPBLTHMULAI")
	private Integer tahunMulai;
	
	@Column(name = "PRPBLBLMULAI")
	private Integer bulanMulai;
	
	@Column(name = "PRPBLTHAKHIR")
	private Integer tahunBerakhir;
	
	@Column(name = "PRPBLBLAKHIR")
	private Integer bulanBerakhir;
}
