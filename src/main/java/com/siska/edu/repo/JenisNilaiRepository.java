package com.siska.edu.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.JenisNilai;
import com.siska.edu.model.JenisNilaiId;

@Repository
public interface JenisNilaiRepository extends JpaRepository<JenisNilai, JenisNilaiId> {

}
