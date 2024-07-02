package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;


@Entity
@Table(name = "tblcategory")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cateid")
    Integer CateID;

    @Column(name = "catename")
    String CateName;
    @Column(name = "isavailable")
    Boolean IsAvailable;

    @ManyToOne
    @JoinColumn(name = "musername")
    Manager manager;

    @Override
    public String toString() {
        return "Category{" +
                "CateID=" + CateID +
                ", CateName='" + CateName + '\'' +
                ", IsAvailable=" + IsAvailable +
                ", manager=" + manager +
                '}';
    }
}
