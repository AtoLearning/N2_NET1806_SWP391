package com.fuswap.controllers;

import com.fuswap.dtos.CategoryDto;
import com.fuswap.dtos.CustomerDto;
import com.fuswap.dtos.ManagerDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.entity.Customer;
import com.fuswap.services.CategoryService;
import com.fuswap.services.ManagerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.data.redis.RedisSessionRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.session.Session;

import java.time.LocalDate;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ManagerService managerService;

    @Autowired
    private RedisSessionRepository sessionRepository;


    @GetMapping("/homepage")
    public List<CategoryDto> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/info")
    public ResponseEntity<ResponseDto> getInfo(@CookieValue("sessionid") String sessionid) {
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionid);
        if(Boolean.TRUE.equals(exists)) {
            Session session = sessionRepository.findById(sessionid);
            CustomerDto customer = (CustomerDto) session.getAttribute("info");
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("OK", "Customer information", customer)
            );
        }
        else {
            log.info("Session ID not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseDto("NOT_FOUND", "Customer information not found", "")
            );
        }
    }

    @GetMapping("/contact")
    public List<ManagerDto> getAllManagers() {
        return managerService.getAllManagers();
    }
}
