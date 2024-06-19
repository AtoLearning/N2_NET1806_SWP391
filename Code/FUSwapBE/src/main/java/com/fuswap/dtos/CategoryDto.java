package com.fuswap.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryDto {

    int cateId;
    String cateName;
    boolean isAvailable;
    boolean isDelete;
    String fullnameManager;

    @Override
    public String toString() {
        return "CategoryDto{" +
                "cateId='" + cateId + '\'' +
                ", cateName='" + cateName + '\'' +
                ", isAvailable=" + isAvailable +
                ", isDelete=" + isDelete +
                ", mUserName='" + fullnameManager + '\'' +
                '}';
    }

}
