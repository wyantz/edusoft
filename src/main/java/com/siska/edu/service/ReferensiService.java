/**
 * 
 */
package com.siska.edu.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siska.edu.model.Referensi;
import com.siska.edu.model.ReferensiId;
import com.siska.edu.model.ReferensiType;
import com.siska.edu.repository.ReferensiRepository;

/**
 * @author Jeremy
 *
 */
@Service
public class ReferensiService {
	@Autowired
	private ReferensiRepository repo;
	
	public List<Referensi> listAll(){
		return (List<Referensi>) repo.findByOrderByIdAsc();
	}
	public List<Referensi> listByJenis(ReferensiType jenis){
		return repo.findByIdJenis(jenis);
	}
	public Referensi get(ReferensiId id) {
		Optional<Referensi> result = repo.findById(id);
		return result.get();
	}
	public void save(Referensi referensi) {
		repo.save(referensi);
	}
	public void delete(ReferensiId id) {
		repo.deleteById(id);
	}

}
