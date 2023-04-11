package com.siska.edu.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.siska.edu.model.MapelPesertaProgram;
import com.siska.edu.model.MapelPesertaProgramId;

/**
 * @author astridrhm
 *
 */
public interface MapelPesertaRepo extends CrudRepository<MapelPesertaProgram, MapelPesertaProgramId>{
	@Modifying
	@Query(value = "delete from t_mapelpeserta where prpbid = :programPembelajaranId and prpbaid = :angkatan and bioid = :biodataId and mapelkd = :kodeMapel", nativeQuery = true)
	public void deletese(@Param("programPembelajaranId")int programPembelajaranId, @Param("angkatan")int angkatan, @Param("biodataId") long biodataId, @Param("kodeMapel")String kodeMapel) ;
	
//	@Query(value = "select from MapelPesertaProgram where (programPembelajaranId = :programPembelajaranId and angkatan = :angkatan and biodataId = :biodataId and kodeMapel = :kodeMapel)", nativeQuery = true)
	public List<MapelPesertaProgram> findByOrderByIdAsc(); 
}