package com.fuswap.dtos;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManagerDto {

    String MUserName;
    String NickName;
    String FullName;
    String Avatar;
    Date DOB;

    @Override
    public String toString() {
        return "ManagerDto{" +
                "MUserName='" + MUserName + '\'' +
                ", NickName='" + NickName + '\'' +
                ", FullName='" + FullName + '\'' +
                ", Avatar='" + Avatar + '\'' +
                ", DOB=" + DOB +
                '}';
    }
}

