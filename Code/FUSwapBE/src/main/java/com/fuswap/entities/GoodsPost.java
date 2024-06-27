package com.fuswap.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Post")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PostID")
    Long PostID;

    @Column(name = "specialpostid")
    String SpecialPostID;
    @Column(name = "tittle")
    String Tittle;
    @Column(name = "description")
    String Description;
    @Column(name = "isexchange")
    Boolean IsExchange;
    @Column(name = "isavailable")
    Boolean IsAvailable;
    @Column(name = "unitprice")
    Float UnitPrice;
    @Column(name = "postcoin")
    Float PostCoin;
    @Column(name = "createat")
    Date CreateAt;

    @ManyToOne
    @JoinColumn(name = "musername")
    Manager manager;

    @ManyToOne
    @JoinColumn(name = "cusername")
    Customer customer;

    @ManyToOne
    @JoinColumn(name = "postaddressid")
    PostAddress postAddress;

    @ManyToOne
    @JoinColumn(name = "cateid")
    Category category;

    public GoodsPost(String specialPostID, String tittle, String description, Boolean isExchange, Boolean isAvailable, Float unitPrice, Float postCoin, Date createAt, Manager manager, Customer customer, PostAddress postAddress, Category category) {
        SpecialPostID = specialPostID;
        Tittle = tittle;
        Description = description;
        IsExchange = isExchange;
        IsAvailable = isAvailable;
        UnitPrice = unitPrice;
        PostCoin = postCoin;
        CreateAt = createAt;
        this.manager = manager;
        this.customer = customer;
        this.postAddress = postAddress;
        this.category = category;
    }

    @Override
    public String toString() {
        return "GoodsPost{" +
                "PostID=" + PostID +
                ", SpecialPostID='" + SpecialPostID + '\'' +
                ", Tittle='" + Tittle + '\'' +
                ", Description='" + Description + '\'' +
                ", IsExchange=" + IsExchange +
                ", IsAvailable=" + IsAvailable +
                ", UnitPrice=" + UnitPrice +
                ", PostCoin=" + PostCoin +
                ", CreateAt=" + CreateAt +
                ", manager=" + manager +
                ", customer=" + customer +
                ", postAddress=" + postAddress +
                ", category=" + category +
                '}';
    }
}
