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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.dao.KurikulumDao;
import com.siska.edu.model.Kurikulum;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/kurikulum")
public class KurikulumController {

	@Autowired
	KurikulumDao kd;

	@GetMapping
	public ResponseEntity<List<Kurikulum>> getKurikulumList() {
		return new ResponseEntity<List<Kurikulum>>((List<Kurikulum>) kd.findAll(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Void> saveKurikulum(@RequestBody Kurikulum kurikulum) {
		if (kurikulum.getNama().isBlank() || kurikulum.getNama().isEmpty() || kurikulum.getKeterangan().isBlank()
				|| kurikulum.getKeterangan().isEmpty()) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
			kd.save(kurikulum);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<Void> updateKurikulum(@RequestBody Kurikulum kurikulum) {
		if (kurikulum.getNama().isBlank() || kurikulum.getNama().isEmpty() || kurikulum.getKeterangan().isBlank()
				|| kurikulum.getKeterangan().isEmpty()) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
		Integer id = kurikulum.getId();
		Kurikulum oldKurikulum = kd.findById(id).get();
		kurikulum.setCreatedBy(oldKurikulum.getCreatedBy());
		kurikulum.setCreatedAt(oldKurikulum.getCreatedAt());
		kd.save(kurikulum);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteKurikulum(@PathVariable Integer id) {
		kd.deleteById(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}
