package com.fuswap.entities.location;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblward")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wardid")
    Integer WardID;

    @Column(name = "wardname")
    String WardName;

    @OneToMany(mappedBy = "ward")
    Set<PostAddress> postAddressSet;

    @ManyToMany
    @JoinTable(name = "tblWardByDistrict",
                joinColumns = {@JoinColumn(name = "wardid")},
                inverseJoinColumns = {@JoinColumn(name = "districtid")})
    Set<District> districtSet;

    @Override
    public String toString() {
        return "Ward{" +
                "WardID=" + WardID +
                ", WardName='" + WardName + '\'' +
                ", postAddressSet=" + (postAddressSet != null ? postAddressSet.size() : 0) +
                ", districtSet=" + (districtSet != null ? districtSet.size() : 0) +
                '}';
    }
}
