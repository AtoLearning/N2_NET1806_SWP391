package com.fuswap.entities.user;

import com.fuswap.entities.post.Category;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.post.Report;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblmanager")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Manager implements Serializable, UserDetails {
    @Id
    @Column(name = "musername")
    String MUserName;

    @Column(name = "strpassword")
    String Password;

    @Column(name = "nickname")
    String Nickname;

    @Column(name = "fullname")
    String FullName;

    @Column(name = "phone")
    String Phone;

    @Column(name = "avatar")
    String Avatar;

    @Column(name = "dob")
    Date DOB;

    @Column(name = "gender")
    String Gender;

    @Column(name = "isavailable")
    Boolean IsAvailable;

    @ManyToOne
    @JoinColumn(name = "managermusername")
    Manager manager;

    @OneToMany(mappedBy = "manager")
    Set<Manager> managerSet;

    @OneToMany(mappedBy = "manager")
    Set<Customer> customerSet;

    @OneToMany(mappedBy = "manager")
    Set<GoodsPost> goodsPostSet;

    @OneToMany(mappedBy = "manager")
    Set<Category> categorySet;

    @OneToMany(mappedBy = "manager")
    Set<Report> reportSet;

    @ManyToMany(mappedBy = "managerSet", fetch = FetchType.EAGER)
    Set<Role> roleSet;

    @Override
    public String toString() {
        return "Manager{" +
                "MUserName='" + MUserName + '\'' +
                ", Password='" + Password + '\'' +
                ", Nickname='" + Nickname + '\'' +
                ", FullName='" + FullName + '\'' +
                ", Phone='" + Phone + '\'' +
                ", Avatar='" + Avatar + '\'' +
                ", DOB=" + DOB +
                ", Gender='" + Gender + '\'' +
                ", IsAvailable=" + IsAvailable +
                ", manager=" + manager +
                ", managerSet=" + (managerSet != null ? managerSet.size() : 0)+
                ", customerSet=" + (customerSet != null ? customerSet.size() : 0)+
                ", goodsPostSet=" + (goodsPostSet != null ? goodsPostSet.size() : 0) +
                ", categorySet=" + (categorySet != null ? categorySet.size() : 0)+
                ", reportSet=" + (reportSet != null ? reportSet.size() : 0) +
                ", roleSet=" + (roleSet != null ? roleSet.size() : 0)+
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roleSet.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return getMUserName();
    }

    @Override
    public String getPassword() {
        return Password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
