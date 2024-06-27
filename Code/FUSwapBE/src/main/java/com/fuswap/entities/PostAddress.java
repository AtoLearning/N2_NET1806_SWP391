package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PostAddress")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postaddressid")
    Integer PostAddressID;

    String StreetNumber;
    String Street;

    @ManyToOne
    @JoinColumn(name = "wardid")
    Ward ward;

    @ManyToOne
    @JoinColumn(name = "districtid")
    District district;

    @ManyToOne
    @JoinColumn(name = "cityid")
    City city;

    @Override
    public String toString() {
        return "PostAddress{" +
                "PostAddressID=" + PostAddressID +
                ", StreetNumber='" + StreetNumber + '\'' +
                ", Street='" + Street + '\'' +
                ", ward=" + ward +
                ", district=" + district +
                ", city=" + city +
                '}';
    }
}
