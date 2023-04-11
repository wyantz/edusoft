package com.siska.edu.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.siska.edu.model.Kurikulum;
import com.siska.edu.model.ProgramAngkatan;


public interface KurikulumDao extends CrudRepository<Kurikulum, Integer> {
	@Query(value = "SELECT k FROM Kurikulum k WHERE LOWER(k.nama) LIKE '%' || :keyword || '%'"
			+ " OR LOWER(k.keterangan) LIKE '%' || :keyword || '%'" + " OR CAST(k.id AS text) LIKE '%' || :keyword || '%' ORDER BY k.id ASC")
	public List<Kurikulum> search(@Param("keyword") String keyword);

}
