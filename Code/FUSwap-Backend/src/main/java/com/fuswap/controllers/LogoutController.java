package com.fuswap.controllers;

import com.fuswap.dtos.ResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.Session;
import org.springframework.session.data.redis.RedisSessionRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
@Slf4j
public class LogoutController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private RedisSessionRepository sessionRepository;

    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> Logout(@CookieValue("sessionid") String sessionid, HttpServletRequest request) {
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionid);
        if(Boolean.TRUE.equals(exists)) {
            boolean isDelete = redisTemplate.delete("spring:session:sessions:" + sessionid);
            if(isDelete) {
                request.getSession().invalidate();
                log.info("Session ID removed");
            } else {
                log.info("Session ID not removed");
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200 ok", "Logout successfully", "")
        );
    }
}
