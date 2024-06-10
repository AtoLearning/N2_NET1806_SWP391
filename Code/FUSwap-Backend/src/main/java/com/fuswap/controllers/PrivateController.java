package com.fuswap.controllers;

import com.fuswap.dtos.UserInfoDto;
import com.fuswap.utils.Utils;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class PrivateController {

    @GetMapping("/user")
    public UserInfoDto privateMessages(@AuthenticationPrincipal OAuth2User user, Model model) {
        if(!Utils.isFptEduEmail(user.getAttribute("email"))) {
            return null;
        }
        UserInfoDto info = new UserInfoDto(
                user.getAttribute("name"),
                user.getAttribute("given_name"),
                user.getAttribute("family_name"),
                user.getAttribute("email")
        );
        model.addAttribute("body", info.toString());
        return info;
    }
}
