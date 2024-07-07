package com.fuswap.services.user;

import com.fuswap.entities.user.Manager;
import com.fuswap.repositories.user.ManagerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Slf4j
@Service
public class ManagerDetailsService implements UserDetailsService {
    private final ManagerRepository managerRepository;

    public ManagerDetailsService(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("username {}", username);
        if(username == null || username.isEmpty()) {username = "admin";}
        Manager manager = managerRepository.findByMUserName(username);
        if (manager == null) {
            log.error("Manager not found with username: {}", username);
            throw new UsernameNotFoundException("Not found");
        }
        log.info("Found manager: {}", manager.getMUserName() + manager.getPassword());
        return new org.springframework.security.core.userdetails.User(
                manager.getMUserName(),
                manager.getPassword(),
                manager.getRoleSet().stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRoleName()))
                        .collect(Collectors.toList())
        );
    }
}
