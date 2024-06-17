package com.fuswap.controllers;

import com.fuswap.dtos.CustomerDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.entity.Customer;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @GetMapping("/login/google/callback")
    public ResponseEntity<Void> handleGoogleLoginCallback(
            HttpServletRequest request, HttpServletResponse response,
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

}