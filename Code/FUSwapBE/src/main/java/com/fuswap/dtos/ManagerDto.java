package com.fuswap.dtos;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManagerDto {

    long id;
    String givenName;
    String familyName;
    String picture;
    String role;
    LocalDate dob;

    @Override
    public String toString() {
        return "ManagerDto{" +
                "id=" + id +
                ", givenName='" + givenName + '\'' +
                ", familyName='" + familyName + '\'' +
                ", picture='" + picture + '\'' +
                ", role='" + role + '\'' +
                ", dob=" + dob +
                '}';
    }

}

