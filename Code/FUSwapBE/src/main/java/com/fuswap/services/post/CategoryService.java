package com.fuswap.services.post;

import com.fuswap.dtos.post.CategoryDto;
import com.fuswap.entities.post.Category;
import com.fuswap.repositories.post.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> getCategoryList() {
        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for(Category category : categoryList) {
            categoryDtoList.add(new CategoryDto(
                    category.getCateID(),
                    category.getCateName(),
                    category.getCateImage()
            ));
        }
        return categoryDtoList;
    }
}
