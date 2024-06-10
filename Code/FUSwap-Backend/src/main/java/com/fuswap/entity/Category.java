package com.fuswap.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "Category")
@Setter
@Getter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CateID", nullable = false)
    private int CateID;

    @Column(name = "CateName", nullable = false, length = 20)
    private String CateName;

    @Column(name = "isAvailable", nullable = false)
    private boolean isAvailable;

    @Column(name = "isDelete", nullable = false)
    private boolean isDelete;

    @JoinColumn
    @Column(name = "MUserName", nullable = false, length = 30)
    private String MUserName;

    public Category() {
    }

    public Category(int cateID, String cateName, boolean isAvailable, boolean isDelete, String MUserName) {
        CateID = cateID;
        CateName = cateName;
        this.isAvailable = isAvailable;
        this.isDelete = isDelete;
        this.MUserName = MUserName;
    }

    public int getCateID() {
        return CateID;
    }

    public void setCateID(int cateID) {
        CateID = cateID;
    }

    public String getCateName() {
        return CateName;
    }

    public void setCateName(String cateName) {
        CateName = cateName;
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

    public String getMUserName() {
        return MUserName;
    }

    public void setMUserName(String MUserName) {
        this.MUserName = MUserName;
    }

    @Override
    public String toString() {
        return "Category{" +
                "CateID=" + CateID +
                ", CateName='" + CateName + '\'' +
                ", isAvailable=" + isAvailable +
                ", isDelete=" + isDelete +
                ", MUserName='" + MUserName + '\'' +
                '}';
    }
}
