package com.fuswap.services.user;

import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.entities.user.Role;
import com.fuswap.repositories.user.CustomerRepository;
import com.fuswap.repositories.user.ManagerRepository;
import com.fuswap.repositories.user.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.fuswap.entities.user.Customer;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;

@Service
@Slf4j
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

    @Transactional(readOnly = true)
    public CustomerDto findByCUserName(String cUserName) {
        Customer customer = customerRepository.findByCUserName(cUserName);
        if(customer != null) {
            return new CustomerDto(
                customer.getCUserName(),
                customer.getGivenName(),
                customer.getFamilyName(),
                customer.getNickname(),
                customer.getAvatar(),
                customer.getPoints(),
                customer.getPhone(),
                customer.getDOB(),
                customer.getAddress(),
                customer.getIsVerified()
            );
        }
        return null;
    }

    public boolean createAccount(Customer newCustomer) {
        Optional<Role> role = roleRepository.findById(3);
        Role r = new Role();
        if(role.isPresent()) {
            r.setRoleID(role.get().getRoleID());
            r.setRoleName(role.get().getRoleName());
        }
        Customer customer = new Customer(
                newCustomer.getCUserName(),
                newCustomer.getGivenName(),
                newCustomer.getFamilyName(),
                newCustomer.getNickname(),
                newCustomer.getAvatar(),
                newCustomer.getPoints(),
                newCustomer.getPhone(),
                newCustomer.getDOB(),
                newCustomer.getAddress(),
                true,
                false,
                managerRepository.findByMUserName("admin"),
                r,
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>()
        );
        customerRepository.save(customer);
        return true;
    }
}
