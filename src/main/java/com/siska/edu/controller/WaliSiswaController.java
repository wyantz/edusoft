package com.siska.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.WaliSiswa;
import com.siska.edu.model.WaliSiswaId;
import com.siska.edu.service.WaliSiswaService;

@RestController
@CrossOrigin(origins = "*")
public class WaliSiswaController {

		@Autowired
		private WaliSiswaService waliSiswaService;

		@RequestMapping("/walisiswa")
		public ResponseEntity<List<WaliSiswa>> getWaliSiswaList() {
			return new ResponseEntity<List<WaliSiswa>>(waliSiswaService.listAll(), HttpStatus.OK);
		}

		@PostMapping("/walisiswa/save")
		public ResponseEntity<Void> saveOrUpdateWaliSiswa(@RequestBody WaliSiswa walisiswa) {
			waliSiswaService.save(walisiswa);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		
		@PostMapping("/walisiswa/get")
		public ResponseEntity<WaliSiswa> getWaliSiswa(@RequestBody WaliSiswaId id) {
			return new ResponseEntity<WaliSiswa>(waliSiswaService.get(id), HttpStatus.OK);
		}

		@DeleteMapping("/walisiswa/delete")
		public ResponseEntity<Void> deleteWaliSiswa(@RequestBody WaliSiswaId id) {
			waliSiswaService.delete(id);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
}
