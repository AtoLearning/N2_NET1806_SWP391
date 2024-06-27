package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Manager")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Manager {

    @Id
    @Column(name = "musername", length = 30)
    String MUserName;
    @Column(name = "password")
    String Password;
    @Column(name = "nickname")
    String NickName;
    @Column(name = "fullname")
    String FullName;
    @Column(name = "avatar")
    String Avatar;
    @Column(name = "dob")
    Date DOB;
    @Column(name = "isavailable")
    Boolean IsAvailable;

    @OneToMany(mappedBy = "manager")
    Set<Customer> customerSet = new HashSet<Customer>();;

    @OneToMany(mappedBy = "manager")
    Set<GoodsPost> postSet = new HashSet<GoodsPost>();;

    @OneToMany(mappedBy = "manager")
    Set<Category> categorySet = new HashSet<Category>();;

    @Override
    public String toString() {
        return "Manager{" +
                "MUserName='" + MUserName + '\'' +
                ", Password='" + Password + '\'' +
                ", NickName='" + NickName + '\'' +
                ", FullName='" + FullName + '\'' +
                ", Avatar='" + Avatar + '\'' +
                ", DOB=" + DOB +
                ", IsAvailable=" + IsAvailable +
                ", customerSet=" + customerSet +
                ", postSet=" + postSet +
                ", categorySet=" + categorySet +
                '}';
    }
}
