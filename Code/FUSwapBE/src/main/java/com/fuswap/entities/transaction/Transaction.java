package com.fuswap.entities.transaction;

import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.user.Customer;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
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
    LocalDate CreateAt;

    @ManyToOne
    @JoinColumn(name = "consumer")
    Customer consumer;

    @ManyToOne
    @JoinColumn(name = "supplier")
    Customer supplier;

    public Transaction(LocalDate createAt, Customer consumer, Customer supplier) {
        CreateAt = createAt;
        this.consumer = consumer;
        this.supplier = supplier;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "TransID=" + TransID +
                ", CreateAt=" + CreateAt +
                ", consumer=" + consumer +
                ", supplier=" + supplier +
                '}';
    }
}
