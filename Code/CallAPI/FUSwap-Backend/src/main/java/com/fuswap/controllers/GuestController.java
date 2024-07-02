package com.fuswap.controllers;

import com.fuswap.dtos.CategoryDto;
import com.fuswap.dtos.ManagerDto;
import com.fuswap.services.CategoryService;
import com.fuswap.services.ManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/v1/guest")
@Slf4j
public class GuestController {

    private final CategoryService categoryService;
    private final ManagerService managerService;

    public GuestController(
            CategoryService categoryService,
            ManagerService managerService) {
        this.categoryService = categoryService;
        this.managerService = managerService;
    }

    @GetMapping("/homepage")
    public Page<CategoryDto> getAllCategories(
            @RequestParam(defaultValue = "0") int page) {
        return categoryService.getAllCategories(page);
    }

    @GetMapping("/contact")
    public List<ManagerDto> getAllManagers() {
        return managerService.getAllManagers();
    }
}
