package com.fuswap.repositories.user;

import com.fuswap.entities.user.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    Customer findByCUserName(String cUserName);
}
