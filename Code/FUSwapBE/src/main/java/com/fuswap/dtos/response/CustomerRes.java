package com.fuswap.dtos.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerRes implements Serializable{

    String cUserName;
    String givenName;
    String familyName;
    String nickname;
    String avatar;
    float points;
    String phone;
    Date dob;
    String address;
    boolean isVerified;

    @Override
    public String toString() {
        return "CustomerRes{" +
                "cUserName='" + cUserName + '\'' +
                ", givenName='" + givenName + '\'' +
                ", familyName='" + familyName + '\'' +
                ", nickname='" + nickname + '\'' +
                ", avatar='" + avatar + '\'' +
                ", points=" + points +
                ", phone='" + phone + '\'' +
                ", dob=" + dob +
                ", address='" + address + '\'' +
                ", isVerified=" + isVerified +
                '}';
    }
}