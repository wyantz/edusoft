/**
 * 
 */
package com.siska.edu.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Data;

/**
 * @author Awiyanto Ajisasongko
 *
 * Mar 30, 2023
 */
@Data
@MappedSuperclass
public class BaseEntity {
	@Column(name = "CRUID", length = 100, nullable = false)
	private String createdBy;
	@Column(name = "UPUID", length = 100)
	private String updatedBy;
	
	@CreatedDate
	@Column(name = "CRD")
	private LocalDateTime createdAt;
	
	@LastModifiedDate
	@Column(name = "UPD")
	private LocalDateTime updatedAt;
	
	@PreUpdate
	public void preUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
	
	@PrePersist
	public void prePersist() {
		this.createdAt = LocalDateTime.now();
	}
}
