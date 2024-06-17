package com.fuswap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Manager")
public class Manager {
    @Id
    @Column(name = "musername", length = 30, nullable = false)
    private String MUserName;

    @Column(name = "password", length = 20, nullable = false)
    private String Password;

    @Column(name = "givenname", length = 30, nullable = false)
    private String GivenName;

    @Column(name = "familyname", length = 30, nullable = false)
    private String FamilyName;

    @Column(name = "picture", length = 200, nullable = true)
    private String Picture;

    @Column(name = "isavailable", nullable = false)
    private boolean isAvailable;

    @Column(name = "isadmin", nullable = false)
    private boolean isAdmin;

    @Column(name = "dob", nullable = true)
    private LocalDate DOB;

    @JoinColumn
    @Column(name = "managermusername", length = 30, nullable = false)
    private String ManagerMUserName;

}
