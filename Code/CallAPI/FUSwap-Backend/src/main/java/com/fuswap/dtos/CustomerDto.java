package com.fuswap.dtos;

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
public class CustomerDto implements Serializable{

    String cUserName;
    String givenName;
    String familyName;
    String nickname;
    String avatar;
    Float coins;
    Float points;
    Date dob;
    String address;
    Boolean isVerified;

    @Override
    public String toString() {
        return "CustomerDto{" +
                "cUserName='" + cUserName + '\'' +
                ", givenName='" + givenName + '\'' +
                ", familyName='" + familyName + '\'' +
                ", nickname='" + nickname + '\'' +
                ", avatar='" + avatar + '\'' +
                ", coins=" + coins +
                ", points=" + points +
                ", dob=" + dob +
                ", address='" + address + '\'' +
                ", isVerified=" + isVerified +
                '}';
    }

}
