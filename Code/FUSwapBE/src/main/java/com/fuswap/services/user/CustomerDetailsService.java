package com.fuswap.services.user;

import com.fuswap.entities.user.Customer;
import com.fuswap.repositories.user.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CustomerDetailsService implements UserDetailsService {
    private final CustomerRepository customerRepository;

    public CustomerDetailsService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Email: {}", email);
        Customer customer = customerRepository.findByCUserName(email);
        if (customer == null) {
            log.info("No user: {}", email);
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        log.info("user: {}", customer.getRole().getRoleName());
        return new org.springframework.security.core.userdetails.User(
                customer.getCUserName(),
                "",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + customer.getRole().getRoleName()))
        );
    }
}
