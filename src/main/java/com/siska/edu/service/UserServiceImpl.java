/**
 * 
 */
package com.siska.edu.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siska.edu.model.Role;
import com.siska.edu.model.User;
import com.siska.edu.repo.RoleDao;
import com.siska.edu.repo.UserDao;

/**
 * @author Awiyanto Ajisasongko
 *
 * Apr 9, 2023
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired UserDao userDao;
	@Autowired RoleDao roleDao;
	
	@Override
	public User findById(String name) {
		Optional<User> o = this.userDao.findById(name);
		if (o.isPresent()) return o.get();
		return null;
	}

	@Override
	public User update(User user) {
		return this.userDao.save(user);
	}

	@Override
	public List<Role> findUserRoles(String userName) {
		return this.roleDao.findUserRole(userName);
	}

}
