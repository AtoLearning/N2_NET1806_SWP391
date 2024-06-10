package com.fuswap.services;

import com.fuswap.dtos.CategoryDto;
import com.fuswap.entity.Category;
import com.fuswap.repositories.CategoryRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

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
}
