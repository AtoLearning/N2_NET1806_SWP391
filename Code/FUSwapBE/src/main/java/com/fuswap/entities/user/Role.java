package com.fuswap.entities.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblrole")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roleid")
    Integer RoleID;

    @Column(name = "rolename")
    String RoleName;

    @OneToMany(mappedBy = "role")
    Set<Customer> customerSet;

    @ManyToMany
    @JoinTable(name = "tblmanagerrole",
            joinColumns = {@JoinColumn(name = "roleid")},
            inverseJoinColumns = {@JoinColumn(name = "musername")})
    Set<Manager> managerSet;

    @Override
    public String toString() {
        return "Role{" +
                "RoleID=" + RoleID +
                ", RoleName='" + RoleName + '\'' +
                ", customerSet=" + (customerSet != null ? customerSet.size() : 0) +
                ", managerSet=" + (managerSet != null ? managerSet.size() : 0) +
                '}';
    }
}
