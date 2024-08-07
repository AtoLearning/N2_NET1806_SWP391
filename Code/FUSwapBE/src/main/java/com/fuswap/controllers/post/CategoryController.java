package com.fuswap.controllers.post;

import com.fuswap.dtos.post.CategoryDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.services.post.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/guest/categories")
    public ResponseEntity<ResponseDto> getCategoryList() {
        List<CategoryDto> categoryList = categoryService.getCategoryList();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200", "OK", categoryList, 0)
        );
    }
}
