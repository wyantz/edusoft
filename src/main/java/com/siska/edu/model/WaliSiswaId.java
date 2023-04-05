/**
 * 
 */
package com.siska.edu.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 22, 2023
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class WaliSiswaId implements Serializable {
	private static final long serialVersionUID = -2542407274463674804L;
	
	@Column(name = "WALJENIS", length = 10, nullable = false)
	private String kodeJenisWaliSiswa;
	
	@Column(name = "BIOID", nullable = false)
	private Long biodataId;
}
