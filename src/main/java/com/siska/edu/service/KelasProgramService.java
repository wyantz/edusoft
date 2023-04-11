package com.siska.edu.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siska.edu.model.KelasProgram;
import com.siska.edu.repo.KelasProgramRepository;

@Service
@Transactional
public class KelasProgramService {
    @Autowired
    KelasProgramRepository kelasProgramRepository;

    public List<KelasProgram> listKelasProgram() {
        return kelasProgramRepository.findAll();
    }

    public void saveKelasProgram(KelasProgram kelasProgram) {
        kelasProgramRepository.save(kelasProgram);
    }

    public void deleteKelasProgram(int id) {
        kelasProgramRepository.deleteById(id);
    }

}


