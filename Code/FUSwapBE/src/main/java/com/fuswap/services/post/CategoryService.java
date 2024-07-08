package com.fuswap.services.post;

import com.fuswap.dtos.response.CategoryRes;
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

    public List<CategoryRes> getCategoryList() {
        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryRes> categoryResList = new ArrayList<>();
        for(Category category : categoryList) {
            categoryResList.add(new CategoryRes(
                    category.getCateID(),
                    category.getCateName(),
                    category.getCateImage()
            ));
        }
        return categoryResList;
    }
}
