package com.siska.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.ProgramAngkatan;
import com.siska.edu.model.ProgramAngkatanId;
import com.siska.edu.model.ProgramPembelajaran;
import com.siska.edu.repo.ProgramAngkatanDao;
import com.siska.edu.repo.ProgramPembelajaranRepository;

@RestController
@RequestMapping("/program-angkatan")
@CrossOrigin(origins = "*")
public class ProgramAngkatanController {
	
	@Autowired
	private ProgramAngkatanDao service;
	
	@Autowired
	private ProgramPembelajaranRepository repo;
	
	@GetMapping("/")
	public ResponseEntity<List<ProgramAngkatan>> getProgAngData() {
		return new ResponseEntity<List<ProgramAngkatan>>(service.listAll(), HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<Void> saveOrUpdateProgAngData(@RequestBody ProgramAngkatan program) {
		service.save(program);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Void> deleteProgAngDataById(@RequestBody ProgramAngkatanId id) {
		service.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping("/update")
	public ResponseEntity<ProgramAngkatan> getProgAngDataById(@RequestBody ProgramAngkatanId id) {
		return new ResponseEntity<ProgramAngkatan>(service.get(id),HttpStatus.OK);
	}
	
	@GetMapping("/search/{keyword}")
	public ResponseEntity<List<ProgramAngkatan>> searchProgAngData(@PathVariable String keyword) {
		return new ResponseEntity<List<ProgramAngkatan>>(service.search(keyword), HttpStatus.OK);
	}
	
	@GetMapping("/progbel")
	public ResponseEntity<List<ProgramPembelajaran>> getProgBelData() {
		return new ResponseEntity<List<ProgramPembelajaran>>(repo.findByOrderByIdAsc(), HttpStatus.OK);
	}

}
