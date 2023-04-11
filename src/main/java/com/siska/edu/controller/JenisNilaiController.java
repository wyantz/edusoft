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

import com.siska.edu.model.JenisNilai;
import com.siska.edu.model.JenisNilaiId;
import com.siska.edu.service.JenisNilaiService;

import lombok.Getter;

@RestController
@CrossOrigin(origins = "*")
public class JenisNilaiController {

	@Autowired
	JenisNilaiService service;
	
	@GetMapping("/jenis_nilai/list")
	public ResponseEntity<List<JenisNilai>> getCompanyList() {
		return new ResponseEntity<List<JenisNilai>>(service.getJenisNilaiList(), HttpStatus.OK);
	}
	@PostMapping("/jenis_nilai/get") 
	public ResponseEntity<JenisNilai> getJenisNilai(@RequestBody JenisNilaiId id) {
		return new ResponseEntity<JenisNilai>(service.getJenisNilaiById(id), HttpStatus.OK);
	}

	@PostMapping("/jenis_nilai/save")
	public ResponseEntity<Void> saveOrUpdateJenisNilai(@RequestBody JenisNilai jenisnilai) {
		service.saveOrUpdateJensiNiali(jenisnilai);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/jenis_nilai/delete")
	public ResponseEntity<Void> deleteCompany(@RequestBody JenisNilaiId id) {
		service.deleteJenisNilai(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}