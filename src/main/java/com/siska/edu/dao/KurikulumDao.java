package com.siska.edu.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.siska.edu.model.Kurikulum;


public interface KurikulumDao extends CrudRepository<Kurikulum, Integer> {
//	@Query(value = "SELECT c FROM T_KURIKULUM c WHERE c.kurid ILIKE '%' || :keyword || '%'"
//			+ " OR c.kurnm ILIKE '%' || :keyword || '%'" + " OR c.kurdesc ILIKE '%' || :keyword || '%'")
//	public List<Kurikulum> search(String keyword);
}
