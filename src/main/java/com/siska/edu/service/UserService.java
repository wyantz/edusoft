/**
 * 
 */
package com.siska.edu.service;

import java.util.List;

import com.siska.edu.model.Role;
import com.siska.edu.model.User;

/**
 * @author Awiyanto Ajisasongko
 *
 * Apr 9, 2023
 */
public interface UserService {
	public User findById(String name);
	public User update(User user);
	public List<Role> findUserRoles(String userName);
}
