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

    public int getCateId() {
        return cateId;
    }

    public void setCateId(int cateId) {
        this.cateId = cateId;
    }

    public String getCateName() {
        return cateName;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public String getmUserName() {
        return mUserName;
    }

    public void setmUserName(String mUserName) {
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
