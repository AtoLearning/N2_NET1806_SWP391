package com.fuswap.services;

import com.fuswap.dtos.ManagerDto;
import com.fuswap.entities.Manager;
import com.fuswap.repositories.ManagerRepository;
import org.springframework.stereotype.Service;


@Service
public class ManagerService {

    private final ManagerRepository managerRepository;

    public ManagerService(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }


}
