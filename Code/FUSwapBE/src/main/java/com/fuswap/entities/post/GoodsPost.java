package com.fuswap.entities.post;

import com.fuswap.entities.transaction.Transaction;
import com.fuswap.entities.user.Manager;
import com.fuswap.entities.location.PostAddress;
import com.fuswap.entities.user.Customer;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblpost")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PostID")
    Long PostID;

    @Column(name = "specialpostid", unique = true)
    String specialPostID;

    @Column(name = "title")
    String Title;

    @Column(name = "content")
    String Content;

    @Column(name = "isexchange")
    Boolean IsExchange;

    @Column(name = "isavailable")
    Boolean IsAvailable;

    @Column(name = "postimage")
    String PostImage;

    @Column(name = "unitprice")
    Float UnitPrice;

    @Column(name = "poststatus")
    String PostStatus;

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

    @OneToOne
    @JoinColumn(name = "feedbackid")
    Feedback feedback;

    @OneToOne
    @JoinColumn(name = "transid")
    Transaction transaction;

    @Override
    public String toString() {
        return "GoodsPost{" +
                "PostID=" + PostID +
                ", specialPostID='" + specialPostID + '\'' +
                ", Title='" + Title + '\'' +
                ", Content='" + Content + '\'' +
                ", IsExchange=" + IsExchange +
                ", IsAvailable=" + IsAvailable +
                ", PostImage='" + PostImage + '\'' +
                ", UnitPrice=" + UnitPrice +
                ", PostStatus=" + PostStatus +
                ", CreateAt=" + CreateAt +
                ", manager=" + (manager != null ? manager.getMUserName() : "") +
                ", customer=" + (customer != null ? customer.getCUserName() : "") +
                ", postAddress=" + (postAddress != null ? postAddress.getPostAddressID() : "") +
                ", category=" + (category != null ? category.getCateName() : "") +
                ", feedback=" + (feedback != null ? feedback.getContent() : "") +
                ", transaction=" + (transaction != null ? transaction.getTransID() : "") +
                '}';
    }
}
