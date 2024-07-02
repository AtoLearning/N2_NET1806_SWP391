package com.fuswap.services;

import com.fuswap.dtos.CustomerDto;
import com.fuswap.entities.Role;
import com.fuswap.repositories.CustomerRepository;
import com.fuswap.repositories.ManagerRepository;
import com.fuswap.repositories.RoleRepository;
import org.springframework.stereotype.Service;
import com.fuswap.entities.Customer;

import java.util.HashSet;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final ManagerRepository managerRepository;
    private final RoleRepository roleRepository;

    public CustomerService(
            CustomerRepository customerRepository,
            ManagerRepository managerRepository,
            RoleRepository roleRepository) {
        this.customerRepository = customerRepository;
        this.managerRepository = managerRepository;
        this.roleRepository = roleRepository;
    }

    public CustomerDto findByCUserName(String cUserName) {
        Customer customer = customerRepository.findByCUserName(cUserName);
        if(customer != null) {
            return new CustomerDto(
                    customer.getCUserName(),
                    customer.getGivenName(),
                    customer.getFamilyName(),
                    customer.getNickname(),
                    customer.getAvatar(),
                    customer.getCoins(),
                    customer.getPoints(),
                    customer.getDOB(),
                    customer.getAddress(),
                    customer.getIsVerified()
            );
        }
        return null;
    }

    public boolean createAccount(CustomerDto customerDto) {
        Optional<Role> role = roleRepository.findById(3);
        Role r = new Role();
        if(role.isPresent()) {
            r.setRoleID(role.get().getRoleID());
            r.setRoleName(role.get().getRoleName());
        }
        Customer customer = new Customer(
                customerDto.getCUserName(),
                customerDto.getGivenName(),
                customerDto.getFamilyName(),
                customerDto.getNickname(),
                customerDto.getAvatar(),
                customerDto.getCoins(),
                customerDto.getPoints(),
                customerDto.getDob(),
                customerDto.getAddress(),
                true,
                customerDto.getIsVerified(),
                managerRepository.findByMUserName("admin"),
                r,
                new HashSet<>()
        );
        customerRepository.save(customer);
        return true;
    }
}
