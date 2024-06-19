package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;


@Entity
@Table(name = "Category")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cateid", nullable = false)
    int CateID;

    @Column(name = "catename", nullable = false, length = 20)
    String CateName;

    @Column(name = "isavailable", nullable = false)
    boolean isAvailable;

    @Column(name = "isdelete", nullable = false)
    boolean isDelete;

    @ManyToOne
    @JoinColumn(name = "musername")
    Manager manager;

    @Override
    public String toString() {
        return "Category{" +
                "CateID=" + CateID +
                ", CateName='" + CateName + '\'' +
                ", isAvailable=" + isAvailable +
                ", isDelete=" + isDelete +
                ", Manager=" + manager +
                '}';
    }

}
