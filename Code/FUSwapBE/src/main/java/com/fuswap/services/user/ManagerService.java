package com.fuswap.services.user;

import com.fuswap.entities.user.Manager;
import com.fuswap.repositories.user.ManagerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class ManagerService {
    private final ManagerRepository managerRepository;

    public ManagerService(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

}
