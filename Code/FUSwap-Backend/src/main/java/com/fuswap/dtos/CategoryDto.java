package com.fuswap.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto {
    private int cateId;
    private String cateName;
    private boolean isAvailable;
    private boolean isDelete;
    private String mUserName;

    public CategoryDto() {
    }

    public CategoryDto(int cateId, String cateName, boolean isAvailable, boolean isDelete, String mUserName) {
        this.cateId = cateId;
        this.cateName = cateName;
        this.isAvailable = isAvailable;
        this.isDelete = isDelete;
        this.mUserName = mUserName;
    }

    @Override
    public String toString() {
        return "CategoryDto{" +
                "cateId='" + cateId + '\'' +
                ", cateName='" + cateName + '\'' +
                ", isAvailable=" + isAvailable +
                ", isDelete=" + isDelete +
                ", mUserName='" + mUserName + '\'' +
                '}';
    }
}
