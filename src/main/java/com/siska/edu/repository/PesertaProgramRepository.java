package com.siska.edu.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.siska.edu.model.PesertaProgram;
import com.siska.edu.model.PesertaProgramId;

public interface PesertaProgramRepository extends CrudRepository<PesertaProgram, PesertaProgramId> {

//	@Query(value = "DELETE FROM PesertaProgram p WHERE p.angkatan='%' AND p.biodataId='%' AND p.programPembelajaranId='%'")
//	@Query(value = "DELETE FROM PesertaProgram p WHERE p.id.prpbaid='%'")
//	@Query(value = "DROP CONSTRAINT p.id='%'")
//	public void deleteByObject(@Param("id") PesertaProgramId id);
//	void deleteByPesertaProgramId_BiodataId(Long biodata);
	
	List<PesertaProgram> findByOrderByIdAsc();
}
