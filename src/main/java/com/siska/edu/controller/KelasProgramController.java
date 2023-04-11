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
import org.springframework.web.bind.annotation.RestController;

import com.siska.edu.model.KelasProgram;
import com.siska.edu.service.KelasProgramService;

@RestController
public class KelasProgramController {
    @Autowired
    private KelasProgramService kelasProgramService;

    @GetMapping("/klpg/api/get")
    private ResponseEntity<List<KelasProgram>> FindAll() {
        return new ResponseEntity<List<KelasProgram>>(kelasProgramService.listKelasProgram(), HttpStatus.OK);
    }

    @PostMapping("/klpg/api/post")
    private ResponseEntity<Void> Save(@RequestBody KelasProgram kelasProgram) {
        kelasProgramService.saveKelasProgram(kelasProgram);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/klpg/api/delete/{id}")
    public ResponseEntity<Void> deleteKelasProgram(@PathVariable int id) {
        kelasProgramService.deleteKelasProgram(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PatchMapping("/klpg/api/patch")
    private ResponseEntity<Void> updateKelasProgram(@RequestBody KelasProgram kelasProgram) {
        kelasProgramService.saveKelasProgram(kelasProgram);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
