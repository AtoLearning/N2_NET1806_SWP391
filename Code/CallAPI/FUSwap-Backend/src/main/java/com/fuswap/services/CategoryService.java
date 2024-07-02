package com.fuswap.services;

import com.fuswap.dtos.CategoryDto;
import com.fuswap.entities.Category;
import com.fuswap.entities.Manager;
import com.fuswap.repositories.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    //View -> Controller -> Server -> Repository
    public Page<CategoryDto> getAllCategories(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 3);
        Page<Category> categoryPage = categoryRepository.findAllWithAvailable(pageable);

        Page<CategoryDto> categoryDtoPage = categoryPage.map(category -> new CategoryDto(
                category.getCateID(),
                category.getCateName(),
                category.getIsAvailable(),
                category.getManager().getFullName()
        ));

        return categoryDtoPage;
    }

    public List<CategoryDto> getAllCategoriesHigh() {
        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for(Category category : categoryList) {
            categoryDtoList.add(new CategoryDto(
                    category.getCateID(),
                    category.getCateName(),
                    category.getIsAvailable(),
                    category.getManager().getFullName()
            ));
        }
        return categoryDtoList;
    }

    public boolean createCategory(CategoryDto categoryDto, Manager manager) {
        Category category = new Category();
        category.setCateName(categoryDto.getCateName());
        category.setIsAvailable(true);
        category.setManager(manager);
        try {
            categoryRepository.save(category);
            log.info("{} is added!", category);
            return true;
        } catch(Exception e) {
            log.info("{} is not added!", category);
            return false;
        }
    }

    public CategoryDto getCategoryById(Long cateId) {
        Optional<Category> category = categoryRepository.findById(cateId);
        return category.map(value -> new CategoryDto(
                value.getCateID(),
                value.getCateName(),
                value.getIsAvailable(),
                value.getManager().getFullName()
        )).orElse(null);

//        if(category.isPresent()) {
//            return new CategoryDto(
//                    category.get().getCateID(),
//                    category.get().getCateName(),
//                    category.get().isAvailable(),
//                    category.get().isDelete(),
//                    category.get().getManager().getFamilyName() +
//                            category.get().getManager().getGivenName()
//            );
//        } else return null;
    }

    public boolean updateCategory(Long cateIdParse, CategoryDto categoryDto) {
        Optional<Category> category = categoryRepository.findById(cateIdParse);
        if(category.isPresent()) {
            categoryRepository.updateCategory(categoryDto.getCateName(), categoryDto.isAvailable(), cateIdParse);
            return true;
        } else return false;
    }

    public boolean updelCategory(Long cateIdParse) {
        Optional<Category> category = categoryRepository.findById(cateIdParse);
        if(category.isPresent()) {
            categoryRepository.updelCategory(cateIdParse);
            return true;
        } else return false;
    }
}
