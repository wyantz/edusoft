package com.siska.edu.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.ProgramAngkatan;
import com.siska.edu.model.ProgramAngkatanId;

@Repository
public interface ProgramAngkatanRepository extends JpaRepository<ProgramAngkatan, ProgramAngkatanId>{
	@Query(value = "SELECT p FROM ProgramAngkatan p WHERE CAST(p.tahunMasuk AS text) LIKE '%' || :keyword || '%'"
			+ " OR CAST(p.id.programPembelajaranId AS text) LIKE '%' || :keyword || '%'"
			+ " OR CAST(p.id.angkatan AS text) LIKE '%' || :keyword || '%' ORDER BY p.id.angkatan ASC")
	public List<ProgramAngkatan> search(@Param("keyword") String keyword);
	public List<ProgramAngkatan> findByOrderByIdAsc();
}
