package com.siska.edu.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.Biodata;
import com.siska.edu.model.Mapel;

@Repository
public interface BiodataRepository extends JpaRepository<Biodata, Long>{
	@Query(value = "SELECT c FROM Biodata c WHERE CAST(c.nik AS text) LIKE '%' || :keyword || '%'"
            + " OR CAST(c.id AS text) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.nama) LIKE '%' || :keyword || '%'"
            + " OR CAST(c.tanggalLahir AS text) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.tempatLahir) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.kodeJenisKelamin) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.asalSekolah) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.levelSekolahAsal) LIKE '%' || :keyword || '%'"
            + " OR LOWER(c.kodePekerjaan) LIKE '%' || :keyword || '%' ORDER BY c.id ASC")
	public List<Biodata> search(@Param("keyword") String keyword);
	public List<Biodata> findAllByOrderByIdAsc();
	public List<Biodata> findAllByOrderByNamaAsc();
}
