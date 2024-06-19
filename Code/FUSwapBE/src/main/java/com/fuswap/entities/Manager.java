package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Manager")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Manager {

    @Id
    @Column(name = "musername", length = 30, nullable = false)
    String MUserName;

    @Column(name = "password", length = 20, nullable = false)
    String Password;

    @Column(name = "givenname", length = 30, nullable = false)
    String GivenName;

    @Column(name = "familyname", length = 30, nullable = false)
    String FamilyName;

    @Column(name = "picture", length = 200)
    String Picture;

    @Column(name = "isavailable", nullable = false)
    boolean isAvailable;

    @Column(name = "isadmin", nullable = false)
    boolean isAdmin;

    @Column(name = "dob")
    LocalDate DOB;

    @JoinColumn
    @Column(name = "managermusername", length = 30, nullable = false)
    String ManagerMUserName;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    List<Category> categoryList;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    List<Customer> customerList;

    @Override
    public String toString() {
        return "Manager{" +
                "MUserName='" + MUserName + '\'' +
                ", Password='" + Password + '\'' +
                ", GivenName='" + GivenName + '\'' +
                ", FamilyName='" + FamilyName + '\'' +
                ", Picture='" + Picture + '\'' +
                ", isAvailable=" + isAvailable +
                ", isAdmin=" + isAdmin +
                ", DOB=" + DOB +
                ", ManagerMUserName='" + ManagerMUserName + '\'' +
                '}';
    }

}
