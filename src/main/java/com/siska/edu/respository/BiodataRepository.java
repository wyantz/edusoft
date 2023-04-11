package com.siska.edu.respository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.Biodata;

@Repository
public interface BiodataRepository extends CrudRepository<Biodata, Long>{
	public List<Biodata> findAllByOrderByIdAsc();
	public List<Biodata> findAllByOrderByNamaAsc();
}
