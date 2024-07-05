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
@Table(name = "tbldistrict")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "districtid")
    Integer DistrictID;

    @Column(name = "districtname")
    String DistrictName;

    @ManyToOne
    @JoinColumn(name = "cityid")
    City city;

    @ManyToMany(mappedBy = "districtSet")
    Set<Ward> wardSet;

    @OneToMany(mappedBy = "district")
    Set<PostAddress> postAddressSet;

    @Override
    public String toString() {
        return "District{" +
                "DistrictID=" + DistrictID +
                ", DistrictName='" + DistrictName + '\'' +
                ", city=" + city +
                ", wardSet=" + (wardSet != null ? wardSet.size() : 0) +
                ", postAddressSet=" + (postAddressSet != null ? postAddressSet.size() : 0) +
                '}';
    }
}
