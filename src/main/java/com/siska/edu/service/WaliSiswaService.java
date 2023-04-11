package com.siska.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siska.edu.model.WaliSiswa;
import com.siska.edu.model.WaliSiswaId;
import com.siska.edu.repository.WaliSiswaRepository;

@Service
@Transactional
public class WaliSiswaService {
	
	@Autowired 
	WaliSiswaRepository repo;
	
	public List<WaliSiswa> listAll() {
		return (List<WaliSiswa>) repo.findAllByOrderByIdAsc();
	}
	
	public void save(WaliSiswa walisiswa) {
        repo.save(walisiswa);
    }
	
	public WaliSiswa get(WaliSiswaId id) {
        return repo.findById(id).get();
    }
     
    public void delete(WaliSiswaId id) {
        repo.deleteById(id);
    }

}
