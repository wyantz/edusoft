package com.siska.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siska.edu.model.ProgramPembelajaran;
import com.siska.edu.repo.ProgramPembelajaranRepository;

@Service
@Transactional
public class ProgramPembelajaranService {

	@Autowired
	ProgramPembelajaranRepository repo;
	
	public List<ProgramPembelajaran> listAll() {
		return (List<ProgramPembelajaran>) repo.findAll();
	}
	
	public void save(ProgramPembelajaran programPembelajaran) {
		repo.save(programPembelajaran);
	}
	
	public void delete(int id) {
		repo.deleteById(id);
	}

	public ProgramPembelajaran get(int id) {
		return repo.findById(id).get();
	}
	
	public List<ProgramPembelajaran> search(String keyword) {
		return repo.search(keyword);
	}
}