package com.fuswap.controllers.user;

import com.fuswap.services.user.ManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/manager")
@Slf4j
public class ManagerController {
    private final ManagerService managerService;

    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

}
