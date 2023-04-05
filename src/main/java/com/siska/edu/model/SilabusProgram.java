/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Silabus pembelajaran per program per level
 * 
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "T_SILABUSPROGRAM")
public class SilabusProgram extends BaseEntity {
	@EmbeddedId
	private SilabusProgramId id;
	
	@Column(name = "SILSKS")
	private Integer jumlahSks;
	
	@ManyToOne
	@JoinColumn(name = "PRPBID", referencedColumnName = "PRPBID", foreignKey = @ForeignKey(name = "fk_silprogram__programbel"), updatable = false, insertable = false)
	private ProgramPembelajaran programPembelajaran;
	
	@ManyToOne
	@JoinColumn(name = "MAPELKD", referencedColumnName = "MAPELKD", foreignKey = @ForeignKey(name = "fk_silprogram__mapel"), updatable = false, insertable = false)
	private Mapel mapel;
}
