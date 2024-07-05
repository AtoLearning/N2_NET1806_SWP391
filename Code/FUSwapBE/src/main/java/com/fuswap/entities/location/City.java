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
@Table(name = "tblcity")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cityid")
    Integer CityID;

    @Column(name = "cityname")
    String CityName;

    @OneToMany(mappedBy = "city")
    Set<PostAddress> postAddressSet;

    @OneToMany(mappedBy = "city")
    Set<District> districtSet;

    @Override
    public String toString() {
        return "City{" +
                "CityID=" + CityID +
                ", CityName='" + CityName + '\'' +
                ", postAddressSet=" + (postAddressSet != null ? postAddressSet.size() : 0) +
                ", districtSet=" + (districtSet != null ? districtSet.size() : 0) +
                '}';
    }
}
