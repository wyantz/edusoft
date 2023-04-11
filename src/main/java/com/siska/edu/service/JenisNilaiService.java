package com.siska.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siska.edu.model.JenisNilai;
import com.siska.edu.model.JenisNilaiId;
import com.siska.edu.repo.JenisNilaiRepository;

@Service
public class JenisNilaiService {
	
	@Autowired
	JenisNilaiRepository repo;
	
	public List<JenisNilai> getJenisNilaiList() {
		return  repo.findAll();
	}

	public JenisNilai getJenisNilaiById(JenisNilaiId id) {
		return repo.findById(id).get();
	}

	public void saveOrUpdateJensiNiali(JenisNilai jenisnilai) {
		repo.save(jenisnilai);
	}

	public void deleteJenisNilai(JenisNilaiId id) {
		repo.deleteById(id);
	}
}
