package com.fuswap.entities.order;

import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.user.Customer;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbltransaction")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transid")
    Long TransID;

    @Column(name = "createat")
    Date CreateAt;

    @ManyToOne
    @JoinColumn(name = "consumer")
    Customer consumer;

    @ManyToOne
    @JoinColumn(name = "supplier")
    Customer supplier;

    @OneToMany(mappedBy = "transaction")
    Set<GoodsPost> goodsPostSet;

    @Override
    public String toString() {
        return "Transaction{" +
                "TransID=" + TransID +
                ", CreateAt=" + CreateAt +
                ", consumer=" + consumer +
                ", supplier=" + supplier +
                ", goodsPostSet=" + (goodsPostSet != null ? goodsPostSet.size() : 0) +
                '}';
    }
}
