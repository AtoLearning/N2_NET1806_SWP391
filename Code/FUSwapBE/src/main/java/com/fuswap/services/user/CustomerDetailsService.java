package com.fuswap.services.user;

import com.fuswap.dtos.response.CustomerRes;
import com.fuswap.entities.user.Customer;
import com.fuswap.repositories.user.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CustomerDetailsService implements UserDetailsService {
    private final CustomerRepository customerRepository;
    private final CustomerService customerService;

    public CustomerDetailsService(CustomerRepository customerRepository, CustomerService customerService) {
        this.customerRepository = customerRepository;
        this.customerService = customerService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByCUserName(email);
        if (customer == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(
                customer.getCUserName(),
                "",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + customer.getRole().getRoleName()))
        );
    }
}
