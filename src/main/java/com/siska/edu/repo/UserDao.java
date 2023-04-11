/**
 * 
 */
package com.siska.edu.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.siska.edu.model.User;

/**
 * @author Awiyanto Ajisasongko
 *
 * Apr 9, 2023
 */
@Repository
public interface UserDao extends JpaRepository<User, String> {
}
