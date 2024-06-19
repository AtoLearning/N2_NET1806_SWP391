package com.fuswap.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

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

    @Override
    public String toString() {
        return "CustomerDto{" +
                "CUserName='" + CUserName + '\'' +
                ", GivenName='" + GivenName + '\'' +
                ", FamilyName='" + FamilyName + '\'' +
                ", Picture='" + Picture + '\'' +
                ", Wallet=" + Wallet +
                ", Points=" + Points +
                ", isVerified=" + isVerified +
                ", Address='" + Address + '\'' +
                ", DOB=" + DOB +
                '}';
    }

}
