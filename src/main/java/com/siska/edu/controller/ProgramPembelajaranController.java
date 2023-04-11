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


import com.siska.edu.model.ProgramPembelajaran;
import com.siska.edu.service.ProgramPembelajaranService;


@RestController
@RequestMapping("/programPembelajaran")
@CrossOrigin(origins = "*")
public class ProgramPembelajaranController {
	@Autowired
	private ProgramPembelajaranService service;
	
	@RequestMapping("/")
	public ResponseEntity<List<ProgramPembelajaran>> getAllProgramPembelajaran() {
		return new ResponseEntity<List<ProgramPembelajaran>>(service.listAll(), HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<Void> saveOrUpdate(@RequestBody ProgramPembelajaran program) {
		service.save(program);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteProgram(@PathVariable int id) {
		service.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping("/update")
	public ResponseEntity<ProgramPembelajaran> getProgramPembelajaran(@PathVariable int id) {
		return new ResponseEntity<ProgramPembelajaran>(service.get(id),HttpStatus.OK);
	}
	
	@GetMapping("/search/{keyword}")
	public ResponseEntity<List<ProgramPembelajaran>> searchProgram(@PathVariable String keyword) {
		return new ResponseEntity<List<ProgramPembelajaran>>(service.search(keyword), HttpStatus.OK);
	}
}
