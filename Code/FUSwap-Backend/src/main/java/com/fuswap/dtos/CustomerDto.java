package com.fuswap.dtos;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerDto implements Serializable{

    String CUserName;
    String GivenName;
    String FamilyName;
    String Picture;
    int Wallet;
    int Points;
    boolean isVerified;
    String Address;
    LocalDate DOB;

}
