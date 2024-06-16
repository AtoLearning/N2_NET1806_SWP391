package com.fuswap.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
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

    public Customer() {
    }

    public Customer(String CUserName, String givenName, String familyName, String picture,
                    boolean isAvailable, int wallet, int points, boolean isVerified,
                    String address, LocalDate DOB, String MUsername) {
        this.CUserName = CUserName;
        GivenName = givenName;
        FamilyName = familyName;
        Picture = picture;
        this.isAvailable = isAvailable;
        Wallet = wallet;
        Points = points;
        this.isVerified = isVerified;
        Address = address;
        this.DOB = DOB;
        this.MUsername = MUsername;
    }
}
