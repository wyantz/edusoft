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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.Mapel;
import com.siska.edu.repo.MapelRepository;

@RestController
@CrossOrigin(origins="*")
public class MapelRestController {
	
	@Autowired
	private MapelRepository repo;
	
	@GetMapping("/mapel")
	public ResponseEntity<List<Mapel>> listMapel(){
		return new ResponseEntity<List<Mapel>>(repo.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/mapel/{kode}")
	public ResponseEntity<Mapel> getMapelById(@PathVariable String kode) {
		return new ResponseEntity<Mapel>(repo.findById(kode).get(), HttpStatus.OK);
	}	
	
	@PostMapping("/mapel/save")
	public ResponseEntity<Void> saveOrUpdateMapel(@RequestBody Mapel mapel){
		repo.save(mapel);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@DeleteMapping("/mapel/delete/{kode}")
	public ResponseEntity<Void> deleteMapelById(@PathVariable String kode){
		repo.deleteById(kode);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@GetMapping("/mapel/search/{keyword}")
	public ResponseEntity<List<Mapel>> searchMapel(@PathVariable String keyword){
		return new ResponseEntity<List<Mapel>>(repo.search(keyword), HttpStatus.OK);
	}
	
	@GetMapping("/mapel/cek/{kode}")
	public boolean checkKode(@PathVariable String kode) {
		boolean validate = repo.existsById(kode);
		return !validate;
	}

}
