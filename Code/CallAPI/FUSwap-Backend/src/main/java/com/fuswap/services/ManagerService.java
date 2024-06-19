package com.fuswap.services;

import com.fuswap.dtos.ManagerDto;
import com.fuswap.entity.Manager;
import com.fuswap.repositories.ManagerRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ManagerService {

    private final ManagerRepository managerRepository;

    public ManagerService(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    public List<ManagerDto> getAllManagers() {
        List<ManagerDto> managersDto = new ArrayList<>();
        List<Manager> managers = managerRepository.findAll();
        int id = 1;
        for (Manager manager : managers) {
            managersDto.add(new ManagerDto(
                    id++,
                    manager.getGivenName(),
                    manager.getFamilyName(),
                    manager.getPicture(),
                    manager.isAdmin() ? "Admin" : "Moderator",
                    manager.getDOB()
            ));
        }
        return managersDto;
    }

    public Manager findByMUserName(String mUserName) {
        return managerRepository.findByMUserName(mUserName);
    }
}
