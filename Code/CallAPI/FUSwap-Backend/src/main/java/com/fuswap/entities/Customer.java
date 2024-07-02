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
@Table(name = "tblcustomer")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Customer {
    @Id
    @Column(name = "cusername")
    String CUserName;
    @Column(name = "givenname")
    String GivenName;
    @Column(name = "familyname")
    String FamilyName;
    @Column(name = "nickname")
    String Nickname;
    @Column(name = "avatar")
    String Avatar;
    @Column(name = "coins")
    Float Coins;
    @Column(name = "points")
    Float Points;
    @Column(name = "dob")
    Date DOB;
    @Column(name = "straddress")
    String Address;
    @Column(name = "isavailable")
    Boolean IsAvailable;
    @Column(name = "isverified")
    Boolean IsVerified;

    @ManyToOne
    @JoinColumn(name = "musername")
    Manager manager;

    @ManyToOne
    @JoinColumn(name = "roleid")
    Role role;

    @OneToMany(mappedBy = "customer")
    Set<GoodsPost> postSet = new HashSet<GoodsPost>();

    @Override
    public String toString() {
        return "Customer{" +
                "CUserName='" + CUserName + '\'' +
                ", GivenName='" + GivenName + '\'' +
                ", FamilyName='" + FamilyName + '\'' +
                ", Nickname='" + Nickname + '\'' +
                ", Avatar='" + Avatar + '\'' +
                ", Coins=" + Coins +
                ", Points=" + Points +
                ", DOB=" + DOB +
                ", Address='" + Address + '\'' +
                ", IsAvailable=" + IsAvailable +
                ", IsVerified=" + IsVerified +
                ", manager=" + manager +
                ", role=" + role +
                ", postSet=" + postSet +
                '}';
    }
}
