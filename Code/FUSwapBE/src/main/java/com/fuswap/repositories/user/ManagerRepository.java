package com.fuswap.repositories.user;

import com.fuswap.entities.user.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, String> {
    Manager findByMUserName(String mUserName);
}
