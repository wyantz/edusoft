/**
 * 
 */
package com.siska.edu.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@Embeddable
public class SilabusProgramId implements Serializable {
	private static final long serialVersionUID = 3046183335388633283L;

	@Column(name = "PRPBID")
	private Integer programPembelajaranId;
	
	@Column(name = "PRPBLLVL")
	private Integer level;
	
	@Column(name = "MAPELKD", length = 20)
	private String kodeMapel;
}
