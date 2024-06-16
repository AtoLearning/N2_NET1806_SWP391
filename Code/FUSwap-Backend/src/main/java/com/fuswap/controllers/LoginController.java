package com.fuswap.controllers;


import com.fuswap.dtos.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class LoginController {


    @GetMapping("/auth/fuswap")
    public ResponseEntity<ResponseDto> loginFuswap() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ResponseDto("UNAUTHORIZED", "Login again!", "")
        );
    }


}
