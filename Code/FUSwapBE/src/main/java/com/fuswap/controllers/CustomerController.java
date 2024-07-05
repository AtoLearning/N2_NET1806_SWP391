package com.fuswap.controllers;

import com.fuswap.dtos.response.CustomerRes;
import com.fuswap.dtos.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/customer")
@Slf4j
public class CustomerController {
    private final RedisTemplate<String, Object> redisTemplate;

    public CustomerController(
            RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @GetMapping("/profile")
    public ResponseEntity<ResponseDto> getCustomerProfile(
            @CookieValue(name = "SESSION", defaultValue = "") String sessionId) {
        sessionId = new String(Base64.getDecoder().decode(sessionId));
//        log.info("sessionId: {}", sessionId);
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionId);
        if(Boolean.TRUE.equals(exists)) {
            Map<Object, Object> sessionAttributes = redisTemplate
                                                    .opsForHash()
                                                    .entries("spring:session:sessions:" + sessionId);
            CustomerRes customerRes = (CustomerRes)sessionAttributes.get("sessionAttr:profile");
            log.info("customerDto: {}", customerRes);
            if(customerRes == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseDto("401", "PROFILE IS NOT FOUND", null, 0)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "PROFILE IS FOUND", customerRes, 0)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("401", "PROFILE IS NOT FOUND", null, 0)
        );
    }
}
