package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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

    @Override
    public String toString() {
        return "City{" +
                "CityID=" + CityID +
                ", CityName='" + CityName + '\'' +
                '}';
    }
}
