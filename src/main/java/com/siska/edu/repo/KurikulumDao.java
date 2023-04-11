package com.siska.edu.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.Kurikulum;

@Repository
public interface KurikulumDao extends CrudRepository<Kurikulum, Integer> {
	@Query(value = "SELECT k FROM Kurikulum k WHERE LOWER(k.nama) LIKE '%' || :keyword || '%'"
			+ " OR LOWER(k.keterangan) LIKE '%' || :keyword || '%'" + " OR CAST(k.id AS text) LIKE '%' || :keyword || '%' ORDER BY k.id ASC")
	public List<Kurikulum> search(@Param("keyword") String keyword);

}
