package com.fuswap.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserInfoDto {
    private String cusername;
    private String givenname;
    private String familyname;
    private String picture;

    public UserInfoDto() {
    }

    public UserInfoDto(String cusername, String givenname, String familyname, String picture, LocalDate dob) {
        this.cusername = cusername;
        this.givenname = givenname;
        this.familyname = familyname;
        this.picture = picture;
    }
}
