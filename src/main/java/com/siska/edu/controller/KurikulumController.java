package com.siska.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.dao.KurikulumDao;
import com.siska.edu.model.Kurikulum;


@RestController
@CrossOrigin(origins ="*")
public class KurikulumController {
	
	@Autowired
	KurikulumDao kd;
	
	@GetMapping("/kurikulums")
	public ResponseEntity<List<Kurikulum>> getCompanyList() {
		return new ResponseEntity<List<Kurikulum>>((List<Kurikulum>) kd.findAll(), HttpStatus.OK);
	}

	@PostMapping("/kurikulum")
	public ResponseEntity<Void> saveOrUpdateCompany(@RequestBody Kurikulum kurikulum) {
		kd.save(kurikulum);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/kurikulum/{id}")
	public ResponseEntity<Void> deleteCompany(@PathVariable Integer id) {
		kd.deleteById(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
//	@GetMapping("/kurikulums/search/{keyword}")
//	public ResponseEntity<List<Kurikulum>> search(Model m, @PathVariable String keyword) {
//		return new ResponseEntity<List<Kurikulum>>(kd.search(keyword), HttpStatus.OK);
//	} 


}
