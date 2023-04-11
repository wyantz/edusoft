package com.siska.edu.repo;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siska.edu.model.ProgramAngkatanLevel;
import com.siska.edu.model.ProgramAngkatanLevelId;

@Service
@Transactional
public class ProgramAngkatanLevelDao {
	@Autowired
	ProgramAngkatanLevelRepository repository;
	
	public List<ProgramAngkatanLevel> listAll() {
		return (List<ProgramAngkatanLevel>) repository.findAll();
	}
	
	public void save(ProgramAngkatanLevel data) {
		repository.save(data);
	}
	
	public void delete(ProgramAngkatanLevelId id) {
		repository.deleteById(id);
	}
	
	public ProgramAngkatanLevel get(ProgramAngkatanLevelId id) {
		Optional<ProgramAngkatanLevel> result = repository.findById(id);
		return result.get();
	}
}
