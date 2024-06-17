package com.fuswap.controllers;


import com.fuswap.dtos.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RestController
@RequestMapping("/api/v1")
public class LoginController {

    @GetMapping("/auth/login")
    public ResponseEntity<Void> loginWithGoogle() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("http://localhost:8080/login"))
                .build();
    }

}
