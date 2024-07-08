package com.fuswap.dtos.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManagerRes implements Serializable {

    String mUserName;
    String nickName;
    String fullName;
    String phone;
    String avatar;
    Date dob;

    @Override
    public String toString() {
        return "ManagerDto{" +
                "MUserName='" + mUserName + '\'' +
                ", NickName='" + nickName + '\'' +
                ", FullName='" + fullName + '\'' +
                ", Phone='" + phone + '\'' +
                ", Avatar='" + avatar + '\'' +
                ", DOB=" + dob +
                '}';
    }
}

