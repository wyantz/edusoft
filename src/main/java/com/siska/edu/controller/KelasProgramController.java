package com.siska.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.KelasProgram;
import com.siska.edu.service.KelasProgramService;

@RestController
@RequestMapping("/klpg/api")
public class KelasProgramController {
    @Autowired
    private KelasProgramService kelasProgramService;

    @GetMapping("/")
    private ResponseEntity<List<KelasProgram>> FindAll() {
        return new ResponseEntity<List<KelasProgram>>(kelasProgramService.listKelasProgram(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<KelasProgram> getKelasProgramById(@PathVariable int id) {
        return new ResponseEntity<KelasProgram>(kelasProgramService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/")
    private ResponseEntity<Void> Save(@RequestBody KelasProgram kelasProgram) {
        kelasProgramService.saveKelasProgram(kelasProgram);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKelasProgram(@PathVariable int id) {
        kelasProgramService.deleteKelasProgram(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PatchMapping("/")
    private ResponseEntity<Void> updateKelasProgram(@RequestBody KelasProgram kelasProgram) {
        kelasProgramService.saveKelasProgram(kelasProgram);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
