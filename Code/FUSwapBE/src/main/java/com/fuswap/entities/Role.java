package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblrole")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roleid")
    Integer RoleID;
    @Column(name = "rolename")
    String RoleName;

    @OneToMany(mappedBy = "role")
    Set<Customer> customerSet = new HashSet<Customer>();

    @Override
    public String toString() {
        return "Role{" +
                "RoleID=" + RoleID +
                ", RoleName='" + RoleName + '\'' +
                ", customerSet=" + customerSet +
                '}';
    }
}
