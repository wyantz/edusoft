package com.siska.edu.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.siska.edu.model.WaliSiswa;
import com.siska.edu.model.WaliSiswaId;

public interface WaliSiswaRepository extends CrudRepository<WaliSiswa, WaliSiswaId>{
	
	public List<WaliSiswa> findAllByOrderByIdAsc();
}