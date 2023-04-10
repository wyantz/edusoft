/**
 * 
 */
package com.siska.edu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.Referensi;
import com.siska.edu.model.ReferensiId;
import com.siska.edu.model.ReferensiType;


/**
 * @author Jeremy
 *
 */
@Repository
public interface ReferensiRepository extends CrudRepository<Referensi, ReferensiId>{
	List<Referensi> findByIdJenis(ReferensiType jenis);
//	@Query(value = "DELETE FROM t_ref WHERE reftpe LIKE '%'"+
//	"AND refkd LIKE '%'")
//	List<Referensi>removeBy(ReferensiId id);
	public List<Referensi> findByOrderByIdAsc();

}
