package com.fuswap.entities.user;

import com.fuswap.entities.transaction.Transaction;
import com.fuswap.entities.post.Feedback;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.post.Report;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblcustomer")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Customer implements Serializable {
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

    @Column(name = "points")
    Float Points;

    @Column(name = "phone")
    String Phone;

    @Column(name = "dob")
    Date DOB;

    @Column(name = "gender")
    String Gender;

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
    Set<GoodsPost> goodsPostSet;

    @OneToMany(mappedBy = "customer")
    Set<Feedback> feedbackSet;

    @OneToMany(mappedBy = "customer")
    Set<Report> reportSet;

    @OneToMany(mappedBy = "consumer")
    Set<Transaction> consumerTransactionSet;

    @OneToMany(mappedBy = "supplier")
    Set<Transaction> supplierTransactionSet;

    @Override
    public String toString() {
        return "Customer{" +
                "CUserName='" + CUserName + '\'' +
                ", GivenName='" + GivenName + '\'' +
                ", FamilyName='" + FamilyName + '\'' +
                ", Nickname='" + Nickname + '\'' +
                ", Avatar='" + Avatar + '\'' +
                ", Points=" + Points +
                ", Phone='" + Phone + '\'' +
                ", DOB=" + DOB +
                ", Gender='" + Gender + '\'' +
                ", Address='" + Address + '\'' +
                ", IsAvailable=" + IsAvailable +
                ", IsVerified=" + IsVerified +
                ", manager=" + manager +
                ", role=" + role +
                ", goodsPostSet=" + (goodsPostSet != null ? goodsPostSet.size() : 0) +
                ", feedbackSet=" + (feedbackSet != null ? feedbackSet.size() : 0) +
                ", reportSet=" + (reportSet != null ? reportSet.size() : 0) +
                ", consumerTransactionSet=" + (consumerTransactionSet != null ? consumerTransactionSet.size() : 0)+
                ", supplierTransactionSet=" + (supplierTransactionSet != null ? supplierTransactionSet.size() : 0)+
                '}';
    }
}
