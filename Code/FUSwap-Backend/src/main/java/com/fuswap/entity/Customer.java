package com.fuswap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Customer")
public class Customer {
    @Id
    @Column(name = "cusername", length = 30, nullable = false)
    private String CUserName;

    @Column(name = "givenname", length = 30, nullable = false)
    private String GivenName;

    @Column(name = "familyname", length = 30, nullable = false)
    private String FamilyName;

    @Column(name = "picture", length = 200, nullable = true)
    private String Picture;

    @Column(name = "isavailable", nullable = false)
    private boolean isAvailable;

    @Column(name = "wallet", nullable = false)
    private int Wallet;

    @Column(name = "points", nullable = false)
    private int Points;

    @Column(name = "isverified", nullable = false)
    private boolean isVerified;

    @Column(name = "address", length = 100, nullable = true)
    private String Address;

    @Column(name = "dob", nullable = true)
    private LocalDate DOB;

    @JoinColumn
    @Column(name = "musername", nullable = false)
    private String MUsername;

}
