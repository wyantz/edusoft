package com.siska.edu.repo;

import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.siska.edu.model.ProgramPembelajaran;


@Repository
public interface  ProgramPembelajaranRepository extends JpaRepository<ProgramPembelajaran, Integer> {
	
	@Query(value = "SELECT p FROM ProgramPembelajaran p WHERE p.nama LIKE '%' || :keyword || '%'"
            + " OR p.levelAwal LIKE '%' || :keyword || '%'"
            + " OR p.levelAkhir LIKE '%' || :keyword || '%'"
            + " OR p.durasiLevel LIKE '%' || :keyword || '%'"
            + " OR p.keterangan LIKE '%' || :keyword || '%'")
    public List<ProgramPembelajaran> search(@Param("keyword") String keyword);
	
	public List<ProgramPembelajaran> findByOrderByIdAsc();
}
