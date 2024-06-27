package com.fuswap.controllers.authentication;

import com.fuswap.dtos.ResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
@Slf4j
public class LogoutController {

    private final RedisTemplate<String, Object> redisTemplate;

    public LogoutController(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> Logout(@CookieValue("sessionid") String sessionid, HttpServletRequest request) {
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionid);
        if(Boolean.TRUE.equals(exists)) {
            boolean isDelete = Boolean.TRUE.equals(redisTemplate.delete("spring:session:sessions:" + sessionid));
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
