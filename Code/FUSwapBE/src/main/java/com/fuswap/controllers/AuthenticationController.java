package com.fuswap.controllers;

import com.fuswap.dtos.CustomerDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.net.URI;


@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {

    @GetMapping("/login/google/callback")
    public ResponseEntity<Void> handleGoogleLoginCallback(
            HttpServletRequest request,
            @AuthenticationPrincipal OAuth2User principal) {
        CustomerDto customer = new CustomerDto(
                principal.getAttribute("email"),
                principal.getAttribute("given_name"),
                principal.getAttribute("family_name"),
                principal.getAttribute("picture"),
                0,
                0,
                false,
                "",
                null
        );
        request.getSession().setAttribute("info", customer);
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("http://localhost:3000/request?sessionid=" + request.getSession().getId()))
                .build();
    }

    @GetMapping("/auth/login")
    public ResponseEntity<Void> loginWithGoogle() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("http://localhost:8080/login"))
                .build();
    }

}