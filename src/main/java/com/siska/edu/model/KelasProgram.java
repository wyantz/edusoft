/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Setiap program belajar per angkatan bisa jadi memiliki lebih dari 1 (satu) kelas, maka informasi setiap kelas
 * disimpan disini
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
@Table(name = "T_KELASPROGRAM")
public class KelasProgram extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "kelas_generator")
	@TableGenerator(name = "kelas_generator", table = "T_GENERATOR")
	@Column(name = "KLPGID")
	private Integer id;
	
	/**
	 * Contoh kelas A,B,C,dst
	 */
	@Column(name = "KLPGKD", length = 5)
	private String kode;

	@ManyToOne
	@JoinColumns(
			foreignKey = @ForeignKey(name = "fk_kelasprogram__kelasprogangkatan"),
			value={
				@JoinColumn(name = "PRPBID", referencedColumnName = "PRPBID"),
				@JoinColumn(name = "PRPBAID", referencedColumnName = "PRPBAID"),
				@JoinColumn(name = "PRPBLLVL", referencedColumnName = "PRPBLLVL")
			}
	)
	private ProgramAngkatanLevel programLevel;
}
