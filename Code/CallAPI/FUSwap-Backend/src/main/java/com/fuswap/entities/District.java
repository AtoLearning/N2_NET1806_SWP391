package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
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

    @ManyToMany(mappedBy = "districtSet")
    Set<Ward> wardSet = new HashSet<Ward>();
}