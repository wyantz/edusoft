package com.siska.edu.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.siska.edu.model.Mapel;


public interface MapelRepository extends JpaRepository<Mapel, String> {
	/*
	 * @Query(value =
	 * "SELECT p FROM Mapel p WHERE p.kode  LIKE '%' || :keyword || '%'" +
	 * " OR p.nama LIKE '%' || :keyword || '%'" +
	 * " OR p.kodeJenisNilai LIKE '%' || :keyword || '%' ORDER BY p.kode ASC")
	 */
	@Query(value = "SELECT c FROM Mapel c WHERE LOWER(c.nama) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.kode) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.kodeJenisNilai) LIKE '%' || :keyword || '%' ORDER BY c.kode ASC")
	public List<Mapel> search(@Param("keyword") String keyword);
}
