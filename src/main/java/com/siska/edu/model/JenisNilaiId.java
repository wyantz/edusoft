/**
 * 
 */
package com.siska.edu.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import lombok.Builder;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Builder
@Embeddable
public class JenisNilaiId implements Serializable {
	private static final long serialVersionUID = 6300441040351208653L;

	@Enumerated(EnumType.STRING)
	@Column(name = "JNKD", length = 20)
	private JenisNilaiEnum kodeJenisNilai;
	
	@Column(name = "JNNILAI")
	private Integer nilai;
}
