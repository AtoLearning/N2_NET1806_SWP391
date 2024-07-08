package com.fuswap.controllers.user;

import com.fuswap.dtos.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
@Slf4j
public class AuthenticationController {

    @GetMapping("/auth-status")
    public ResponseEntity<ResponseDto> getAuthStatus(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseDto("401", "UNAUTHORIZED", "", 0)
            );
        } else {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().toString();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "AUTHORIZED", role, 0)
            );
        }
    }


}
