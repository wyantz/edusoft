package com.siska.edu.repo;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siska.edu.model.ProgramAngkatan;
import com.siska.edu.model.ProgramAngkatanId;

@Service
@Transactional
public class ProgramAngkatanDao {
	
	@Autowired
	ProgramAngkatanRepository repository;
	
	public List<ProgramAngkatan> listAll() {
		return (List<ProgramAngkatan>) repository.findByOrderByIdAsc();
	}
	
	public void save(ProgramAngkatan programAngkatan) {
		repository.save(programAngkatan);
	}
	
	public void delete(ProgramAngkatanId id) {
		repository.deleteById(id);
	}

	public ProgramAngkatan get(ProgramAngkatanId id) {
		Optional<ProgramAngkatan> result = repository.findById(id);
		return result.get();
	}
	
	public List<ProgramAngkatan> search(String keyword) {
		return repository.search(keyword);
	}
}
