package com.fuswap.controllers.user;

import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.services.user.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class CustomerController {
    private final RedisTemplate<String, Object> redisTemplate;
    private final CustomerService customerService;

    public CustomerController(
            RedisTemplate<String, Object> redisTemplate, CustomerService customerService) {
        this.redisTemplate = redisTemplate;
        this.customerService = customerService;
    }

    @GetMapping("/customer/permission/profile")
    public ResponseEntity<ResponseDto> getCustomerProfile(
            @CookieValue(name = "SESSION", defaultValue = "") String sessionId) {
        sessionId = new String(Base64.getDecoder().decode(sessionId));
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionId);
        if(Boolean.TRUE.equals(exists)) {
            Map<Object, Object> sessionAttributes = redisTemplate
                                                    .opsForHash()
                                                    .entries("spring:session:sessions:" + sessionId);
            CustomerDto customerDto = (CustomerDto)sessionAttributes.get("sessionAttr:profile");
            if(customerDto == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseDto("401", "PROFILE IS NOT FOUND", null, 0)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "PROFILE IS FOUND", customerDto, 0)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("401", "PROFILE IS NOT FOUND", null, 0)
        );
    }

    @PutMapping("/customer/permission/profile/update")
    public ResponseEntity<ResponseDto> updateCustomerProfile(
            @RequestBody CustomerDto customerDto,
            Authentication authentication,
            HttpServletRequest request) {
        String cUserName = getUserNameInAuthentication(authentication);
        if(cUserName != null && cUserName.equals(customerDto.getCUserName())) {
            boolean isUpdate = customerService.updateCustomerProfile(customerDto, request);
            if(isUpdate) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseDto("200", "PROFILE UPDATED", customerDto, 0)
                );
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        new ResponseDto("400", "PROFILE UPDATE FAILED", "", 0)
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseDto("401", "PROFILE IS NOT FOUND", "", 0)
            );
        }
    }

    private String getUserNameInAuthentication(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
