/**
 * 
 */
package com.siska.edu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Data master kurikulum
 * 
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "T_KURIKULUM")
public class Kurikulum extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "kurikulum_generator")
	@TableGenerator(name = "kurikulum_generator", table = "T_GENERATOR")
	@Column(name = "KURID")
	private Integer id;
	
	@Column(name = "KURNM", length = 100, nullable = false)
	private String nama;

	@Column(name = "KURDESC", length = 255, nullable = false)
	private String keterangan;
}
