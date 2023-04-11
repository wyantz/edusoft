/**
 * 
 */
package com.siska.edu.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.siska.edu.model.Role;
import com.siska.edu.model.User;

/**
 * @author Awiyanto Ajisasongko
 *
 * Apr 9, 2023
 */
public class CustomUserDetailService implements UserDetailsService {
	private static Logger log = LoggerFactory.getLogger(CustomUserDetailService.class);
	
	@Autowired
	private UserService userService;

	@SuppressWarnings("serial")
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.debug("Finding user {}", username);
		User user = this.userService.findById(username);
		if (user!=null) {
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			List<Role> l = this.userService.findUserRoles(username);
			if ((l!=null) && l.size()>0) {
				for (final Role r : l) {
					GrantedAuthority ga = new GrantedAuthority() {
						@Override
						public String getAuthority() {
							return r.getId();
						}
					};
					authorities.add(ga);
				}
			} else {
				throw new UsernameNotFoundException("User has no GrantedAuthority");
			}
			UserDetails details = new UserDetails() {
				
				@Override
				public boolean isEnabled() {
					return true;
				}
				
				@Override
				public boolean isCredentialsNonExpired() {
					return true;
				}
				
				@Override
				public boolean isAccountNonLocked() {
					return true;
				}
				
				@Override
				public boolean isAccountNonExpired() {
					return true;
				}
				
				@Override
				public String getUsername() {
					return user.getName();
				}
				
				@Override
				public String getPassword() {
					return user.getPassword();
				}
				
				@Override
				public Collection<? extends GrantedAuthority> getAuthorities() {
					return authorities;
				}
			};
			return details;

		} else {
			throw new UsernameNotFoundException("User not found");
		}
	}

	/*
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	*/
}
