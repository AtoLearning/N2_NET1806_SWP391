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
@Table(name = "Ward")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wardid")
    Integer WardID;

    String WardName;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "WardByDistrict",
                joinColumns = {@JoinColumn(name = "wardid")},
                inverseJoinColumns = {@JoinColumn(name = "districtid")})
    Set<District> districtSet = new HashSet<District>();
}
