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
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.Biodata;
import com.siska.edu.model.Mapel;
import com.siska.edu.repo.BiodataRepository;
import com.siska.edu.service.BiodataService;

@RestController
@CrossOrigin(origins = "*")

public class BiodataRestController {
	@Autowired
	private BiodataService service;
	private BiodataRepository repo;

	@GetMapping("/biodata")
	public ResponseEntity<List<Biodata>> getBiodataList() {
		return new ResponseEntity<List<Biodata>>(service.listAll(), HttpStatus.OK);
	}

	@GetMapping("/biodata/{id}")
	public ResponseEntity<Biodata> getBiodata(@PathVariable int id) {
		return new ResponseEntity<Biodata>(service.getBiodataById(id), HttpStatus.OK);
	}

	@PostMapping("/biodata/save")
	public ResponseEntity<Void> saveOrUpdateBiodata(@RequestBody Biodata biodata) {
		service.saveBiodata(biodata);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/biodata/delete/{id}")
	public ResponseEntity<Void> deleteBiodata(@PathVariable int id) {
		service.deleteBiodataById(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@GetMapping("/biodata/search/{keyword}")
	public ResponseEntity<List<Biodata>> search(@PathVariable String keyword){
		return new ResponseEntity<List<Biodata>>(service.search(keyword.toLowerCase()), HttpStatus.OK);
	}
	
	@GetMapping("/biodata/cek/{id}")
	public boolean checkKode(@PathVariable Long id) {
		boolean validate = repo.existsById(id);
		return !validate;
	}
}
