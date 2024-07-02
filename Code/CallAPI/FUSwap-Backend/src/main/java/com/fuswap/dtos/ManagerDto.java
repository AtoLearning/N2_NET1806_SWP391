package com.fuswap.dtos;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManagerDto {

    String mUserName;
    String nickname;
    String fullName;
    String avatar;
    Date dob;

    @Override
    public String toString() {
        return "ManagerDto{" +
                "MUserName='" + mUserName + '\'' +
                ", NickName='" + nickname + '\'' +
                ", FullName='" + fullName + '\'' +
                ", Avatar='" + avatar + '\'' +
                ", DOB=" + dob +
                '}';
    }

}

