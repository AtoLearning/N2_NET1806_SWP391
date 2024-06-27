package com.fuswap.controllers.authentication;

import com.fuswap.dtos.CustomerDto;
import com.fuswap.repositories.CustomerRepository;
import com.fuswap.services.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.Date;


@RestController
@RequestMapping("/api/v1")
public class LoginController {

    private final CustomerService customerService;

    public LoginController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/login/google/callback")
    public ResponseEntity<Void> handleGoogleLoginCallback(
            HttpServletRequest request,
            @AuthenticationPrincipal OAuth2User principal) {
        CustomerDto customerDto = customerService.findByCUserName(principal.getAttribute("email"));
        if(customerDto == null) {
            CustomerDto customer = new CustomerDto(
                    principal.getAttribute("email"),
                    principal.getAttribute("given_name"),
                    principal.getAttribute("family_name"),
                    "",
                    principal.getAttribute("picture"),
                    0f,
                    0f,
                    new Date(),
                    "",
                    false
            );
            boolean isCreated = customerService.createAccount(customer);
            if(!isCreated) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .location(URI.create("http://localhost:3000/Login"))
                        .build();
            }
        }
        request.getSession().setAttribute("info", customerDto);
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("http://localhost:3000/request?sessionid=" + request.getSession().getId()))
                .build();
    }

    @GetMapping("/auth/login")
    public ResponseEntity<Void> loginWithGoogle() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("http://localhost:8080/oauth2/authorization/google"))
                .build();
    }

}