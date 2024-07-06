package com.fuswap.entities.post;


import com.fuswap.entities.user.Manager;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

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

    @Column(name = "cateimage")
    String CateImage;

    @Column(name = "isavailable")
    Boolean IsAvailable;

    @ManyToOne
    @JoinColumn(name = "musername")
    Manager manager;

    @OneToMany(mappedBy = "category")
    Set<GoodsPost> goodsPostSet;

    @Override
    public String toString() {
        return "Category{" +
                "CateID=" + CateID +
                ", CateName='" + CateName + '\'' +
                ", CateImage='" + CateImage + '\'' +
                ", IsAvailable=" + IsAvailable +
                ", manager=" + manager +
                ", goodsPostSet=" + (goodsPostSet != null ? goodsPostSet.size() : 0) +
                '}';
    }
}
