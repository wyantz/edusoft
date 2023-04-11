/**
 * 
 */
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

import com.siska.edu.model.Referensi;
import com.siska.edu.model.ReferensiId;
import com.siska.edu.service.ReferensiService;

/**
 * @author Jeremy
 *
 */
@RestController
@CrossOrigin(origins="*")
public class ReferensiController {
	@Autowired
	private ReferensiService service;
	
	@GetMapping("/referensi")
	public ResponseEntity<List<Referensi>> getListReferensi(){
		return new ResponseEntity<List<Referensi>>(service.listAll(),HttpStatus.OK);
	}
	@PostMapping("/referensi/edit")
	public ResponseEntity <Referensi> getReferensi(@RequestBody ReferensiId id){
		return new ResponseEntity<Referensi> (service.get(id),HttpStatus.OK);
	}
	@PostMapping("/referensi/save")
	public ResponseEntity <Void> saveOrUpdateReferensi(@RequestBody Referensi referensi){
		service.save(referensi);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	@DeleteMapping("/referensi/delete")
	public ResponseEntity <Void> delteReferensi(@RequestBody ReferensiId id){
		service.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}
