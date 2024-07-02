package com.fuswap.controllers;

import com.fuswap.dtos.CategoryDto;
import com.fuswap.dtos.CustomerDto;
import com.fuswap.dtos.ManagerDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.entities.Manager;
import com.fuswap.services.CategoryService;
import com.fuswap.services.ManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {

    private final RedisTemplate<String, Object> redisTemplate;
    private final CategoryService categoryService;
    private final ManagerService managerService;

    public CustomerController(
            RedisTemplate<String, Object> redisTemplate,
            CategoryService categoryService,
            ManagerService managerService) {
        this.redisTemplate = redisTemplate;
        this.categoryService = categoryService;
        this.managerService = managerService;
    }

    @GetMapping("/homepage")
    public Page<CategoryDto> getAllCategories(
            @RequestParam(defaultValue = "0") int page) {
        log.info("page {}", page);
        return categoryService.getAllCategories(page);
    }

    @GetMapping("/homepage/permission")
    public List<CategoryDto> getAllCategoriesHigh() {
        return categoryService.getAllCategoriesHigh();
    }

    @GetMapping("/category/{cateId}")
    public ResponseEntity<ResponseDto> getCategoryById(@PathVariable String cateId) {
        Long cateIdParse = Long.parseLong(cateId);
        CategoryDto categoryDto = categoryService.getCategoryById(cateIdParse);
        if (categoryDto != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK",
                            cateId + " IS FOUND!",
                            categoryDto)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseDto("404 NOT FOUND",
                            cateId + " IS NOT FOUND!",
                            null)
            );
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ResponseDto> getCustomerProfile(
            @CookieValue(name = "SESSION", defaultValue = "") String sessionId) {
        sessionId = new String(Base64.getDecoder().decode(sessionId));
        log.info("sessionId: {}", sessionId);
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionId);
        if(Boolean.TRUE.equals(exists)) {
            Map<Object, Object> sessionAttributes = redisTemplate
                    .opsForHash()
                    .entries("spring:session:sessions:" + sessionId);
            CustomerDto customerDto = (CustomerDto)sessionAttributes.get("sessionAttr:profile");
            log.info("customerDto: {}", customerDto);
            if(customerDto == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseDto("401", "PROFILE IS NOT FOUND", null)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "PROFILE IS FOUND", customerDto)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("401", "PROFILE IS NOT FOUND", null)
        );
    }

    @GetMapping("/contact")
    public List<ManagerDto> getAllManagers() {
        return managerService.getAllManagers();
    }

    @PostMapping("/category")
    public ResponseEntity<ResponseDto> createCategory(@RequestBody CategoryDto categoryDto) {
        Manager manager = getManagerByMUserName("admin");
        boolean isAdded = categoryService.createCategory(categoryDto, manager);
        if(isAdded) {
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseDto("201 CREATED",
                            categoryDto.getCateName() + " is created successfully!",
                            categoryDto)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400 BAD REQUEST",
                            categoryDto.getCateName() + " is created failed!",
                            categoryDto)
            );
        }
    }

    @PutMapping("/category/{cateId}")
    public ResponseEntity<ResponseDto> updateCategory(@PathVariable String cateId, @RequestBody CategoryDto categoryDto) {
        Long cateIdParse = Long.parseLong(cateId);
        boolean isUpdated = categoryService.updateCategory(cateIdParse, categoryDto);
        if(isUpdated) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 UPDATED",
                            categoryDto.getCateName() + " is update successfully!",
                            categoryDto)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400 BAD REQUEST",
                            categoryDto.getCateName() + " is update failed!",
                            "")
            );
        }
    }

    @DeleteMapping("/category/{cateId}")
    public ResponseEntity<ResponseDto> updelCategory(@PathVariable String cateId) {
        Long cateIdParse = Long.parseLong(cateId);
        boolean isUpdeled = categoryService.updelCategory(cateIdParse);
        if (isUpdeled) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 UPDELED",
                            cateId + " is deleted successfully!",
                            "")
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400 BAD REQUEST",
                            cateId + " is deleted failed!",
                            "")
            );
        }
    }

    private Manager getManagerByMUserName(String mUserName) {
        return managerService.findByMUserName(mUserName);
    }
}
