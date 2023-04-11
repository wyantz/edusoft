/**
 * 
 */
package com.siska.edu.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.Role;

/**
 * @author Awiyanto Ajisasongko
 *
 * Apr 9, 2023
 */
@Repository
public interface RoleDao extends JpaRepository<Role, String> {
	@Query(value = "from Role r, UserRole ur where r.id=ur.id.roleId and ur.id.userName=:userName")
	public List<Role> findUserRole(@Param("userName") String userName);
}
