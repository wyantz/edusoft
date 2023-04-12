package com.siska.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.siska.edu.model.PesertaProgram;
import com.siska.edu.model.PesertaProgramId;
import com.siska.edu.model.ProgramAngkatanId;
import com.siska.edu.service.PesertaProgramService;

@Controller
@RequestMapping("/pesertaprogram")
@CrossOrigin(origins = "*")
public class PesertaProgramController {

	@Autowired
	PesertaProgramService service;

	@GetMapping("/list")
	public ResponseEntity<List<PesertaProgram>> listPesertaProgram() {
		return new ResponseEntity<List<PesertaProgram>>(service.listAll(), HttpStatus.OK);
	}

	@PostMapping("/get")
	public ResponseEntity<PesertaProgram> getPesertaProgramById(@RequestBody PesertaProgramId id) {
		return new ResponseEntity<PesertaProgram>(service.get(id), HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<Void> saveOrUpdatePesertaProgram(@RequestBody PesertaProgram pesertaProgram) {
		service.save(pesertaProgram);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Void> deletePesertaProgramById(@RequestBody PesertaProgramId id) {
		service.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}
