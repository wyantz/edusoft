package com.siska.edu.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.siska.edu.model.Kurikulum;


public interface KurikulumDao extends CrudRepository<Kurikulum, Integer> {

}
