package com.siska.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siska.edu.model.MapelPesertaProgram;
import com.siska.edu.model.MapelPesertaProgramId;
import com.siska.edu.repo.MapelPesertaRepo;


/**
 * @author astridrhm
 *
 */

@Service
@Transactional
public class MapelPesertaService {
	@Autowired
	MapelPesertaRepo repo;

	public void save(MapelPesertaProgram mapelpeserta) {
		repo.save(mapelpeserta);
	}

	public List<MapelPesertaProgram> listAll() {
		return (List<MapelPesertaProgram>) repo.findAll();
	}

	public MapelPesertaProgram get(MapelPesertaProgramId id) {
		return repo.findById(id).get();
	}

	public void delete(int programPembelajaranId, int angkatan, long biodataId, String kodeMapel) {
		repo.deletese(programPembelajaranId, angkatan, biodataId, kodeMapel);
	}
}
