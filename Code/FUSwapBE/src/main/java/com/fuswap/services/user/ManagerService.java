package com.fuswap.services.user;

import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.dtos.user.ManagerDto;
import com.fuswap.entities.user.Customer;
import com.fuswap.entities.user.Manager;
import com.fuswap.repositories.user.ManagerRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
public class ManagerService {
    private final ManagerRepository managerRepository;

    public ManagerService(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    public Manager findByMUserName(String username) {
        return managerRepository.findByMUserName(username);
    }

    @Transactional(readOnly = true)
    public ManagerDto getByMUserName(String cUserName) {
        Manager manager = managerRepository.findByMUserName(cUserName);
        if(manager != null) {
            return new ManagerDto(
                    manager.getMUserName(),
                    manager.getNickname(),
                    manager.getFullName(),
                    manager.getPhone(),
                    manager.getAvatar(),
                    manager.getDOB(),
                    manager.getGender()
            );
        }
        return null;
    }

    public boolean updateManagerProfile (
            ManagerDto managerDto,
            HttpServletRequest request) {
        Manager manager = managerRepository.findByMUserName(managerDto.getMUserName());
        if(manager != null) {
            if(!managerDto.getFullName().isBlank()) manager.setFullName(managerDto.getFullName());
            if(!managerDto.getNickName().isBlank()) manager.setNickname(managerDto.getNickName());
            if(!managerDto.getAvatar().isBlank()) manager.setAvatar(managerDto.getAvatar());
            if(managerDto.getDob() != null) manager.setDOB(managerDto.getDob());
            if(!managerDto.getGender().isBlank()) manager.setGender(managerDto.getGender());
            if(!managerDto.getPhone().isBlank()) manager.setPhone(managerDto.getPhone());
            managerRepository.save(manager);
            request.getSession().setAttribute("managerProfile", getByMUserName(manager.getMUserName()));
            return true;
        }
        return false;
    }
}
