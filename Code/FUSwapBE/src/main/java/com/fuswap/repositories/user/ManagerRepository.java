package com.fuswap.repositories.user;

import com.fuswap.entities.user.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, String> {
    Manager findByMUserName(String mUserName);
}
