package com.fuswap.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ManagerDto {
    private long id;
    private String givenName;
    private String familyName;
    private String picture;
    private String role;
    private LocalDate dob;

    public ManagerDto() {
    }

    public ManagerDto(long id, String givenName, String familyName, String picture, String role, LocalDate dob) {
        this.id = id;
        this.givenName = givenName;
        this.familyName = familyName;
        this.picture = picture;
        this.role = role;
        this.dob = dob;
    }
}

