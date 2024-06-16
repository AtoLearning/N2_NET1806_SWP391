package com.fuswap.entity;

import com.sun.jdi.event.ClassUnloadEvent;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "Category")
@Setter
@Getter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cateid", nullable = false)
    private int CateID;

    @Column(name = "catename", nullable = false, length = 20)
    private String CateName;

    @Column(name = "isavailable", nullable = false)
    private boolean isAvailable;

    @Column(name = "isdelete", nullable = false)
    private boolean isDelete;

    @JoinColumn
    @Column(name = "musername", nullable = false, length = 30)
    private String MUserName;

    public Category(String cateName, boolean isAvailable, boolean isDelete, String MUserName) {
        CateName = cateName;
        this.isAvailable = isAvailable;
        this.isDelete = isDelete;
        this.MUserName = MUserName;
    }

    public Category() {
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
