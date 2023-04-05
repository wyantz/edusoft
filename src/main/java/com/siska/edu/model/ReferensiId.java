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
public class ReferensiId implements Serializable {
	private static final long serialVersionUID = -2438087177797030547L;
	@Column(name = "REFTPE")
	private ReferensiType jenis;
	
	@Column(name = "REFKD", length = 10)
	private String kode;
}
