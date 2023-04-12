package com.siska.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.MapelPesertaProgram;
import com.siska.edu.model.MapelPesertaProgramId;
import com.siska.edu.service.MapelPesertaService;

/**
 * @author astridrhm
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class MapelPesertaRestController {

	@Autowired
	private MapelPesertaService service;

	@GetMapping("/mapelpeserta")
	public ResponseEntity<List<MapelPesertaProgram>> getMPList() {
		return new ResponseEntity<List<MapelPesertaProgram>>(service.listAll(), HttpStatus.OK);
	}

	@GetMapping("/mapelpeserta/get")
	public ResponseEntity<MapelPesertaProgram> getMP(@RequestBody MapelPesertaProgramId id) {
		return new ResponseEntity<MapelPesertaProgram>(service.get(id), HttpStatus.OK);
	}

	@PostMapping("/mapelpeserta/save")
	public ResponseEntity<Void> saveMP(@RequestBody MapelPesertaProgram mapelpeserta) {
		service.save(mapelpeserta);			
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping("/mapelpeserta/save")
	public ResponseEntity<Void> updateMP(@RequestBody MapelPesertaProgram mapelpeserta) {
		MapelPesertaProgramId id = mapelpeserta.getId();
		MapelPesertaProgram mpp = service.get(id);
		mapelpeserta.setCreatedAt(mpp.getCreatedAt());
		mapelpeserta.setCreatedBy(mpp.getCreatedBy());
		service.save(mapelpeserta);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	

	@DeleteMapping("/mapelpeserta/delete")
	public ResponseEntity<Void> deleteMP(@RequestParam("programPembelajaranId") int programPembelajaranId,
			@RequestParam("angkatan") int angkatan, @RequestParam("biodataId") long biodataId,
			@RequestParam("kodeMapel") String kodeMapel) {
//			int ppi = Integer.parseInt(programPembelajaranId);
//			int angkt = Integer.parseInt(angkatan);
//			int bio = Integer.parseInt(biodataId);
		service.delete(programPembelajaranId, angkatan, biodataId, kodeMapel);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
