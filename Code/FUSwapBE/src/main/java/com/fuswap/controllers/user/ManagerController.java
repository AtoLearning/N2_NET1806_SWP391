package com.fuswap.controllers.user;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.dtos.user.ManagerDto;
import com.fuswap.services.user.ManagerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class ManagerController {
    private final ManagerService managerService;
    private final RedisTemplate<String, Object> redisTemplate;

    public ManagerController(ManagerService managerService, RedisTemplate<String, Object> redisTemplate) {
        this.managerService = managerService;
        this.redisTemplate = redisTemplate;
    }

    @GetMapping("/manager/profile")
    public ResponseEntity<ResponseDto> getManagerProfile(
            @CookieValue(name = "SESSION", defaultValue = "") String sessionId) {
        sessionId = new String(Base64.getDecoder().decode(sessionId));
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionId);
        if(Boolean.TRUE.equals(exists)) {
            Map<Object, Object> sessionAttributes = redisTemplate
                    .opsForHash()
                    .entries("spring:session:sessions:" + sessionId);
            ManagerDto managerDto = (ManagerDto)sessionAttributes.get("sessionAttr:managerProfile");
            if(managerDto == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseDto("401", "PROFILE IS NOT FOUND", null, 0)
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "PROFILE IS FOUND", managerDto, 0)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("401", "PROFILE IS NOT FOUND", null, 0)
        );
    }

    @PutMapping("/manager/profile/update")
    public ResponseEntity<ResponseDto> updateCustomerProfile(
            @RequestBody ManagerDto managerDto,
            Authentication authentication,
            HttpServletRequest request) {
        String cUserName = getUserNameInAuthentication(authentication);
        log.info(managerDto.toString());
        if(cUserName != null && cUserName.equals(managerDto.getMUserName())) {
            boolean isUpdate = managerService.updateManagerProfile(managerDto, request);
            if(isUpdate) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseDto("200", "PROFILE UPDATED", managerDto, 0)
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
