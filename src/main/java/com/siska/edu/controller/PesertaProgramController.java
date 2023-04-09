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

import com.siska.edu.model.PesertaProgram;
import com.siska.edu.model.PesertaProgramId;
import com.siska.edu.service.PesertaProgramService;

@RestController
@CrossOrigin("*")
public class PesertaProgramController {
	
	@Autowired
	PesertaProgramService pesertaProgramService;
	
	@RequestMapping("/pesertaprogram")
	public ResponseEntity<List<PesertaProgram>> getAllPesertaProgram() {
		return new ResponseEntity<List<PesertaProgram>>(pesertaProgramService.listAll(), HttpStatus.OK);
	}

	@PostMapping("/pesertaprogram/save")
	public ResponseEntity<Void> saveOrUpdatePesertaProgram(@RequestBody PesertaProgram pesertaProgram) {
		pesertaProgramService.save(pesertaProgram);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping("/pesertaprogram/get")
	public ResponseEntity<PesertaProgram> getPesertaProgram(@RequestBody PesertaProgramId id) {
		return new ResponseEntity<PesertaProgram>(pesertaProgramService.get(id), HttpStatus.OK);
	}

	@DeleteMapping("/pesertaprogram/delete")
	public ResponseEntity<Void> deletePesertaProgram(@RequestBody PesertaProgramId id) {
		pesertaProgramService.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}