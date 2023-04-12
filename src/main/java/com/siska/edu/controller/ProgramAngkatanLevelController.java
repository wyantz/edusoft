package com.siska.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.ProgramAngkatanLevel;
import com.siska.edu.model.ProgramAngkatanLevelId;
import com.siska.edu.repo.ProgramAngkatanLevelDao;

@RestController
@RequestMapping("/program-angkatan-level")
@CrossOrigin(origins = "*")
public class ProgramAngkatanLevelController {
	@Autowired
	private ProgramAngkatanLevelDao service;
	
	@GetMapping("/")
	public ResponseEntity<List<ProgramAngkatanLevel>> getData() {
		return new ResponseEntity<List<ProgramAngkatanLevel>>(service.listAll(), HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<Void> saveOrUpdateData(@RequestBody ProgramAngkatanLevel data) {
		service.save(data);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<Void> deleteData(@RequestBody ProgramAngkatanLevelId id) {
		service.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PostMapping("/update")
	public ResponseEntity<ProgramAngkatanLevel> getDataById(@RequestBody ProgramAngkatanLevelId id) {
		return new ResponseEntity<ProgramAngkatanLevel>(service.get(id), HttpStatus.OK);
	}
}
