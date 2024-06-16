package com.fuswap.services;

import com.fuswap.dtos.CategoryDto;
import com.fuswap.entity.Category;
import com.fuswap.repositories.CategoryRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> getAllCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for(Category category : categoryList) {
            categoryDtoList.add(new CategoryDto(
                    category.getCateID(),
                    category.getCateName(),
                    category.isAvailable(),
                    category.isDelete(),
                    category.getMUserName()
            ));
        }
        return categoryDtoList;
    }

    public boolean addCategory(CategoryDto categoryDto) {
        Category category = new Category(
                categoryDto.getCateName(),
                categoryDto.isAvailable(),
                categoryDto.isDelete(),
                categoryDto.getMUserName()
        );
        System.out.println(category.toString());
        try {
            Category obj = categoryRepository.save(category);
            return true;
        } catch(Exception e) {
            return false;
        }
    }
}
