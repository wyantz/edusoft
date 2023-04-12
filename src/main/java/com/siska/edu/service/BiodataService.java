package com.siska.edu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siska.edu.model.Biodata;
import com.siska.edu.repo.BiodataRepository;

@Service
public class BiodataService {
	@Autowired
	private BiodataRepository repo;
	
	public List<Biodata> listAll(){
		return (List<Biodata>) repo.findAllByOrderByIdAsc();
	}
	
	public void saveBiodata(Biodata biodata) {
		this.repo.save(biodata);		
	}
	
	public Biodata getBiodataById(long id) {
		Optional <Biodata> result = repo.findById(id);
        return result.get();
    }
	
	public void deleteBiodataById(long id) {
		this.repo.deleteById(id);
	}
	
	public List<Biodata> search(String keyword) {
	    return repo.search(keyword);
	}

}
