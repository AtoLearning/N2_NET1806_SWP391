package com.fuswap.controllers;

import com.fuswap.dtos.CategoryDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
public class HomeController {

    private final CategoryService categoryService;

    public HomeController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/homepage")
    public List<CategoryDto> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/category")
    public ResponseEntity<ResponseDto> addCategory(@RequestBody CategoryDto categoryDto) {
        if(categoryService.addCategory(categoryDto))
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseDto("CREATED", "Create new category successfully", categoryDto)
            );
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("BAD_REQUEST", "Create new category failed", categoryDto)
            );
    }
}
