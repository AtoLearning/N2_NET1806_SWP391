package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Customer")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Customer {

    @Id
    @Column(name = "cusername", length = 30, nullable = false)
    String CUserName;

    @Column(name = "givenname", length = 30, nullable = false)
    String GivenName;

    @Column(name = "familyname", length = 30, nullable = false)
    String FamilyName;

    @Column(name = "picture", length = 200)
    String Picture;

    @Column(name = "isavailable", nullable = false)
    boolean isAvailable;

    @Column(name = "wallet", nullable = false)
    int Wallet;

    @Column(name = "points", nullable = false)
    int Points;

    @Column(name = "isverified", nullable = false)
    boolean isVerified;

    @Column(name = "address", length = 100)
    String Address;

    @Column(name = "dob")
    LocalDate DOB;

    @ManyToOne
    @JoinColumn(name = "musername")
    Manager manager;

    @Override
    public String toString() {
        return "Customer{" +
                "CUserName='" + CUserName + '\'' +
                ", GivenName='" + GivenName + '\'' +
                ", FamilyName='" + FamilyName + '\'' +
                ", Picture='" + Picture + '\'' +
                ", isAvailable=" + isAvailable +
                ", Wallet=" + Wallet +
                ", Points=" + Points +
                ", isVerified=" + isVerified +
                ", Address='" + Address + '\'' +
                ", DOB=" + DOB +
                ", manager=" + manager +
                '}';
    }

}
