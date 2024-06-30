package com.fuswap.entities;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblcategory")
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
